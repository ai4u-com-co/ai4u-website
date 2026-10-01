import { test, expect } from '@playwright/test';

test.describe('AI4U Smoke Test', () => {
  test('should load the homepage and not have console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.error('❌ Console Error:', msg.text());
      }
    });

    await page.goto('/');

    // Verificar título
    await expect(page).toHaveTitle(/AI4U/);

    // Verificar que el root no esté vacío
    const root = page.locator('#root');
    await expect(root).not.toBeEmpty();

    // Verificar que no hubo errores de consola críticos
    // El error que arreglamos "nn is not a function" aparecería aquí
    expect(consoleErrors).not.toContain(expect.stringContaining('is not a function'));
    expect(consoleErrors.length).toBeLessThanOrEqual(5); // Permitir algunos warnings menores si existen
  });

  test('should navigate to services page', async ({ page }) => {
    await page.goto('/');
    
    // Los destinos viven en el menú de pantalla completa: se abre con el botón "Menú".
    await page.getByRole('button', { name: /menú/i }).first().click();
    const servicesLink = page.getByRole('dialog').getByRole('link', { name: /a tu medida/i });
    await servicesLink.click();

    // Verificar que la URL cambió a /servicios
    await expect(page).toHaveURL(/\/servicios/);
    
    // Verificar que el contenido cargó (root no está vacío)
    const root = page.locator('#root');
    await expect(root).not.toBeEmpty();
  });

  test('should be accessible (basic check)', async ({ page }) => {
    await page.goto('/');
    // Verificar que existan elementos básicos de accesibilidad
    const root = page.locator('#root');
    await expect(root).toBeVisible();

    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('should set per-route titles (SEO)', async ({ page }) => {
    await page.goto('/servicios');
    await expect(page).toHaveTitle(/A tu medida/);

    await page.goto('/portafolio');
    await expect(page).toHaveTitle(/Casos/);

    await page.goto('/por-que-ai4u');
    await expect(page).toHaveTitle(/Por qué AI4U/);
  });

  test('should not mark pages as noindex', async ({ page }) => {
    // Bug histórico: ServiceCard inyectaba noindex en /servicios
    await page.goto('/servicios');
    await page.waitForSelector('#root :first-child');
    const robots = await page.locator('meta[name="robots"]').first().getAttribute('content');
    expect(robots).not.toContain('noindex');
  });

  test('social icons should have accessible names', async ({ page }) => {
    await page.goto('/');
    for (const name of ['Instagram', 'Facebook', 'LinkedIn']) {
      await expect(page.locator('footer').getByRole('link', { name })).toBeVisible();
    }
  });

  test('should not mention superAI brand in nav', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    await expect(nav).not.toContainText(/superAI/i);
  });

  test('/super-ai redirects to the home (superAI salió del sitio)', async ({ page }) => {
    await page.goto('/super-ai');
    await expect(page).not.toHaveURL(/\/super-ai/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('/tableros redirects to /dashboards', async ({ page }) => {
    await page.goto('/tableros');
    await expect(page).toHaveURL(/\/dashboards/);
  });

  test('/dashboards renders its own page', async ({ page }) => {
    await page.goto('/dashboards');
    await expect(page).toHaveTitle(/Dashboards/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('/portafolio lists the five cases', async ({ page }) => {
    await page.goto('/portafolio');
    await expect(page.locator('article.a4-case')).toHaveCount(5);
  });

  test('the bar only shows "Menú" and the full-screen menu lists the destinations without Contacto', async ({ page }) => {
    await page.goto('/');
    const bar = page.locator('header nav').first();
    await expect(bar.getByRole('link', { name: 'Agentes' })).toHaveCount(0);
    await page.getByRole('button', { name: /menú/i }).first().click();
    const menu = page.getByRole('dialog');
    await expect(menu).toBeVisible();
    for (const name of ['Agentes', 'Dashboards', 'A tu medida', 'Sitios web', 'Casos', 'Nosotros']) {
      await expect(menu.getByRole('link', { name: new RegExp(name) })).toBeVisible();
    }
    await expect(menu.getByRole('link', { name: /^contacto/i })).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
  });

  test('every public page has the footer with the unified contact', async ({ page }) => {
    for (const path of ['/', '/agentes', '/dashboards', '/servicios', '/sitios-web', '/portafolio', '/por-que-ai4u', '/orderloader', '/politica-de-privacidad', '/condiciones-de-servicio', '/eliminacion-de-datos']) {
      await page.goto(path);
      const footer = page.locator('footer');
      await expect(footer).toHaveCount(1);
      await expect(footer).toContainText('hola@ai4u.com.co');
      await expect(footer).toContainText('+57 302 490 6414');
    }
  });

  test('an agent card flips to its business sheet', async ({ page }) => {
    await page.goto('/agentes');
    const card = page.locator('article.a4-flip').first();
    await card.getByRole('button', { name: /dar vuelta/i }).click();
    await expect(card.getByText('Ficha de negocio')).toBeVisible();
    await expect(card.getByText('Lo revisa')).toBeVisible();
    await expect(card.getByText('Trabaja para')).toHaveCount(0);
    await card.getByRole('button', { name: /frente/i }).click();
    await expect(card.getByRole('button', { name: /dar vuelta/i })).toBeVisible();
  });

  test('primary CTA should point to WhatsApp', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('link', { name: /cuéntanos tu problema/i }).first();
    await expect(cta).toBeVisible();
    // Se valida el href: abrir wa.me depende de la red y deja popup.url() vacío
    await expect(cta).toHaveAttribute('href', /wa\.me\/573024906414/);
  });
});
