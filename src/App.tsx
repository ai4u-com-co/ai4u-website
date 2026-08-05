import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout, ScrollToTop, BasicLoadingWrapper } from './components/shared/ui/layouts';
import { ErrorBoundary } from './components/shared/ui/molecules';
import { ThemeProvider, ServicesProvider } from '@/context';
import { ROUTES } from './utils/constants';
import './utils/errorTracking';
// Home se importa directo (ruta crítica / LCP); el resto va lazy para partir el bundle
import Home from './pages/Home';

const Services = lazy(() => import('./pages/Services'));
const TiendaAi = lazy(() => import('./pages/TiendaAi'));
const WhyAI4U = lazy(() => import('./pages/WhyAI4U'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const SitiosWeb = lazy(() => import('./pages/SitiosWeb'));
const DesignSystem = lazy(() => import('./pages/DesignSystem'));
const Pitch = lazy(() => import('./pages/Pitch'));
const PitchBancolombia = lazy(() => import('./pages/PitchBancolombia'));
const PitchFondoEmprender = lazy(() => import('./pages/PitchFondoEmprender'));
const PropuestaElBarril = lazy(() => import('./pages/PropuestaElBarril'));
const PropuestaManufactura = lazy(() => import('./pages/PropuestaManufactura'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const DataDeletion = lazy(() => import('./pages/DataDeletion'));

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <ServicesProvider>
            <BasicLoadingWrapper>
              <Router
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <ScrollToTop />
                <Suspense fallback={null}>
                <Routes>
                  {/* Standalone Routes */}
                  <Route
                    path={ROUTES.DESIGN_SYSTEM}
                    element={<DesignSystem />}
                  />

                  {/* Main Application Layout Routes */}
                  <Route
                    path="*"
                    element={
                      <Layout>
                        <Routes>
                          {/* Home Route */}
                          <Route
                            path={ROUTES.HOME}
                            element={<Home />}
                          />

                          {/* Services Route */}
                          <Route
                            path={ROUTES.SERVICES}
                            element={<Services />}
                          />

                          {/* Why AI4U Route (Merged with Cases) */}
                          <Route
                            path={ROUTES.WHY_AI4U}
                            element={<WhyAI4U />}
                          />

                          {/* Portfolio Route */}
                          <Route
                            path={ROUTES.PORTFOLIO}
                            element={<Portfolio />}
                          />

                          {/* Sitios Web Route — oferta aparte, capa 3 (no forma parte del pitch de agentes) */}
                          <Route
                            path={ROUTES.SITIOS_WEB}
                            element={<SitiosWeb />}
                          />

                          {/* Tienda AI Route — catálogo público de agentes, la evidencia detrás del pitch */}
                          <Route
                            path={ROUTES.TIENDA_AI}
                            element={<TiendaAi />}
                          />

                          {/* Redirect Success Cases to Why AI4U */}
                          <Route
                            path="/casos-de-uso"
                            element={<Navigate to={ROUTES.WHY_AI4U} replace />}
                          />

                          {/* Redirect legacy SuperAI page — todo es ai4u */}
                          <Route
                            path={ROUTES.SUPER_AI}
                            element={<Navigate to={ROUTES.HOME} replace />}
                          />

                          <Route
                            path={ROUTES.PITCH}
                            element={<Pitch />}
                          />

                          {/* Pitch Bancolombia Route */}
                          <Route
                            path={ROUTES.PITCH_BANCOLOMBIA}
                            element={<PitchBancolombia />}
                          />

                          <Route
                            path={ROUTES.PITCH_FONDO_EMPRENDER}
                            element={<PitchFondoEmprender />}
                          />

                          <Route
                            path={ROUTES.PROPUESTA_EL_BARRIL}
                            element={<PropuestaElBarril />}
                          />

                          {/* Propuesta Manufactura Route */}
                          <Route
                            path={ROUTES.PROPUESTA_MANUFACTURA}
                            element={<PropuestaManufactura />}
                          />

                          <Route
                            path={ROUTES.PRIVACY_POLICY}
                            element={<PrivacyPolicy />}
                          />

                          <Route
                            path={ROUTES.TERMS_OF_SERVICE}
                            element={<TermsOfService />}
                          />

                          <Route
                            path={ROUTES.DATA_DELETION}
                            element={<DataDeletion />}
                          />

                          {/* Fallback Route - Siempre al final */}
                          <Route path="*" element={<Home />} />
                        </Routes>
                      </Layout>
                    }
                  />
                </Routes>
                </Suspense>
              </Router>
            </BasicLoadingWrapper>
          </ServicesProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
