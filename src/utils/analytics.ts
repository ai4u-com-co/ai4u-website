// Analytics utility mejorado para AI4U - Tracking humanístico
import { logger } from './logger';
import { trackPixelEvent } from './metaPixel';

// Configuración de eventos específicos AI4U
const AI4U_EVENTS = {
  // Eventos de negocio
  SERVICE_INTEREST: 'service_interest',
  CONSULTATION_REQUEST: 'consultation_request', 
  DIAGNOSTIC_START: 'diagnostic_start',
  CASE_STUDY_VIEW: 'case_study_view',
  
  // Eventos de engagement
  PHILOSOPHY_ENGAGEMENT: 'philosophy_engagement',
  TIME_LIBERATION_FOCUS: 'time_liberation_focus',
  HUMANISTIC_AI_INTEREST: 'humanistic_ai_interest',
  
  // Eventos técnicos
  PERFORMANCE_ISSUE: 'performance_issue',
  ERROR_BOUNDARY_HIT: 'error_boundary_hit',
  PAGE_LOAD_SLOW: 'page_load_slow',
} as const;

// Interface para eventos customizados
interface AI4UAnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

class AI4UAnalytics {
  private isGALoaded = false;

  constructor() {
    // Verificar si Google Analytics está disponible
    this.checkGAAvailability();
  }

  private checkGAAvailability() {
    if (typeof window !== 'undefined' && window.gtag) {
      this.isGALoaded = true;
      logger.log('📊 Google Analytics disponible');
    } else {
      logger.warn('⚠️ Google Analytics no disponible');
    }
  }

  // Tracking de eventos específicos AI4U
  trackServiceInterest(serviceName: string, source: string = 'unknown') {
    this.trackEvent({
      action: AI4U_EVENTS.SERVICE_INTEREST,
      category: 'business',
      label: serviceName,
      custom_parameters: {
        source,
        timestamp: new Date().toISOString(),
        user_journey_point: 'service_exploration'
      }
    });
  }

  trackConsultationRequest(method: string = 'chat', serviceType?: string) {
    // Los botones de WhatsApp abren el chat por código (no son <a>), así que el
    // evento de Meta se dispara aquí; los enlaces <a> los cubre MetaPixelTracker.
    trackPixelEvent('Contact', { contact_method: method, ...(serviceType ? { service_type: serviceType } : {}) });
    this.trackEvent({
      action: AI4U_EVENTS.CONSULTATION_REQUEST,
      category: 'conversion',
      label: method,
      value: 1, // Alto valor para conversiones
      custom_parameters: {
        service_type: serviceType,
        contact_method: method,
        conversion_funnel: 'consultation_request'
      }
    });
  }

  trackDiagnosticStart(source: string = 'homepage') {
    this.trackEvent({
      action: AI4U_EVENTS.DIAGNOSTIC_START,
      category: 'engagement',
      label: source,
      custom_parameters: {
        diagnostic_type: 'ai_readiness',
        entry_point: source
      }
    });
  }

  trackPhilosophyEngagement(section: string, timeSpent?: number) {
    this.trackEvent({
      action: AI4U_EVENTS.PHILOSOPHY_ENGAGEMENT,
      category: 'content',
      label: section,
      value: timeSpent,
      custom_parameters: {
        philosophy_section: section,
        engagement_type: 'humanistic_ai',
        time_spent_seconds: timeSpent
      }
    });
  }

  trackPerformanceIssue(metric: string, value: number, threshold: number) {
    this.trackEvent({
      action: AI4U_EVENTS.PERFORMANCE_ISSUE,
      category: 'technical',
      label: metric,
      value: Math.round(value),
      custom_parameters: {
        metric_name: metric,
        actual_value: value,
        threshold_exceeded: threshold,
        user_agent: navigator.userAgent.substring(0, 100)
      }
    });
  }

  trackErrorBoundary(errorInfo: any, componentStack?: string) {
    this.trackEvent({
      action: AI4U_EVENTS.ERROR_BOUNDARY_HIT,
      category: 'error',
      label: errorInfo.message || 'unknown_error',
      custom_parameters: {
        error_message: errorInfo.message,
        error_stack: errorInfo.stack?.substring(0, 500),
        component_stack: componentStack?.substring(0, 300),
        page_url: window.location.href
      }
    });
  }

  // Método genérico para eventos customizados
  trackEvent(event: AI4UAnalyticsEvent) {
    if (!this.isGALoaded) {
      logger.warn('Analytics event skipped - GA not loaded:', event.action);
      return;
    }

    try {
      const eventData: any = {
        event_category: event.category || 'general',
        event_label: event.label || '',
      };

      // Agregar valor si está presente
      if (event.value !== undefined) {
        eventData.value = event.value;
      }

      // Agregar parámetros customizados
      if (event.custom_parameters) {
        Object.assign(eventData, event.custom_parameters);
      }

      // Enviar a Google Analytics
      window.gtag('event', event.action, eventData);
      
      logger.log(`📊 Event tracked: ${event.action}`, event.category);
    } catch (error) {
      logger.error('Error tracking analytics event:', error);
    }
  }

  // Tracking de pageviews mejorado
  trackPageView(pageName: string, customData?: Record<string, any>) {
    if (!this.isGALoaded) return;

    try {
      window.gtag('config', 'G-44D5SE9KCR', {
        page_title: `${pageName} | AI4U`,
        page_location: window.location.href,
        ...customData
      });
      
      logger.log(`📊 Page view tracked: ${pageName}`);
    } catch (error) {
      logger.error('Error tracking page view:', error);
    }
  }

  // Métricas de tiempo de permanencia
  trackTimeOnPage(pageName: string, timeSpent: number) {
    this.trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      label: pageName,
      value: Math.round(timeSpent / 1000), // Convertir a segundos
      custom_parameters: {
        time_spent_ms: timeSpent,
        page_name: pageName,
        engagement_quality: timeSpent > 30000 ? 'high' : timeSpent > 10000 ? 'medium' : 'low'
      }
    });
  }
}

// Export singleton instance
export const analytics = new AI4UAnalytics();
export default analytics;