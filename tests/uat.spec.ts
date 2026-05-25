import { expect, test } from '@playwright/test';

test.describe('GraceCanvas UAT', () => {
  test('public pages load and navigation works', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=AI-Powered Church Design')).toBeVisible();

    await page.click('text=See AI Generator');
    await expect(page.locator('text=AI Poster Generator')).toBeVisible();

    await page.goto('/templates');
    await expect(page.locator('span:has-text("Template Marketplace")')).toBeVisible();
    await expect(page.locator('text=Remix instantly')).toHaveCount(4);

    await page.goto('/pricing');
    await expect(page.locator('a:has-text("Pricing")')).toBeVisible();
    await expect(page.locator('h2:has-text("Free")')).toBeVisible();

    await page.goto('/dashboard');
    await expect(page.locator('text=Your church media workspace and brand kit manager.')).toBeVisible();
  });

  test('AI generator form validates and returns fallback concept', async ({ page }) => {
    await page.goto('/ai-generator');

    await page.click('button:has-text("Generate concepts")');
    await expect(page.locator('text=Please fill required fields')).toBeVisible();

    await page.fill('input[placeholder="Event title"]', 'Sunday Worship Night');
    await page.fill('input[placeholder="Date & time"]', 'Sun, Aug 16 · 6PM');
    await page.fill('input[placeholder="Venue"]', 'Grace Chapel');
    await page.fill('input[placeholder="Church name"]', 'Grace Chapel Church');

    await page.click('button:has-text("Generate concepts")');
    await expect(page.locator('text=AI result')).toBeVisible();
    await expect(page.locator('h3:has-text("City Revival Experience")')).toBeVisible();
    await expect(page.locator('text=Colors:')).toBeVisible();
  });

  test('API endpoints and auth-related workflows work end-to-end', async ({ request }) => {
    const templatesResponse = await request.get('/api/templates');
    expect(templatesResponse.ok()).toBeTruthy();
    const templates = await templatesResponse.json();
    expect(templates.templates).toBeInstanceOf(Array);
    expect(templates.templates.length).toBeGreaterThanOrEqual(3);

    const pricingResponse = await request.get('/api/pricing');
    expect(pricingResponse.ok()).toBeTruthy();
    const pricing = await pricingResponse.json();
    expect(pricing.plans).toBeInstanceOf(Array);
    expect(pricing.plans[0].name).toContain('Starter');

    const generateFail = await request.post('/api/ai/generate', {
      data: { eventTitle: '', dateTime: '', venue: '', churchName: '' },
    });
    expect(generateFail.status()).toBe(400);

    const generateOk = await request.post('/api/ai/generate', {
      data: {
        eventTitle: 'Community Outreach',
        dateTime: 'Sat, Sep 10 · 2PM',
        venue: 'City Hall',
        churchName: 'Grace Community',
        mood: 'uplifting',
      },
    });
    expect(generateOk.ok()).toBeTruthy();
    const generateData = await generateOk.json();
    expect(generateData.concept).toBeTruthy();
    expect(generateData.concept.title).toBeDefined();

    const analysisResponse = await request.post('/api/analysis/upload', {
      data: { referenceText: 'A modern worship flyer with stage lights and bold typography.' },
    });
    expect(analysisResponse.ok()).toBeTruthy();
    const analysis = await analysisResponse.json();
    expect(analysis.analysis).toBeTruthy();
    expect(analysis.analysis.palette).toBeInstanceOf(Array);

    const uniqueEmail = `uat+${Date.now()}@example.com`;
    const signupResponse = await request.post('/api/auth/signup', {
      data: { name: 'UAT Tester', email: uniqueEmail, password: 'StrongPass123!' },
    });
    expect(signupResponse.status()).toBe(201);
    const signupData = await signupResponse.json();
    expect(signupData.user.email).toBe(uniqueEmail);

    const loginResponse = await request.post('/api/auth/login', {
      data: { email: uniqueEmail, password: 'StrongPass123!' },
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginData = await loginResponse.json();
    expect(loginData.token).toBeTruthy();

    const authHeader = { Authorization: `Bearer ${loginData.token}` };
    const meResponse = await request.get('/api/auth/me', { headers: authHeader });
    expect(meResponse.ok()).toBeTruthy();
    const meData = await meResponse.json();
    expect(meData.user.email).toBe(uniqueEmail);

    const projectCreate = await request.post('/api/projects', {
      headers: authHeader,
      data: { name: 'UAT Project' },
    });
    expect(projectCreate.status()).toBe(201);
    const projectData = await projectCreate.json();
    expect(projectData.project.name).toBe('UAT Project');

    const projectsList = await request.get('/api/projects', { headers: authHeader });
    expect(projectsList.ok()).toBeTruthy();
    const projectsData = await projectsList.json();
    expect(projectsData.projects.some((project: any) => project.name === 'UAT Project')).toBeTruthy();
  });
});
