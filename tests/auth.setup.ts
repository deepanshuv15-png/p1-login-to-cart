// Runs ONCE before the tests: log in through the UI and save the session to a file.
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('log in once and save the session', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login(process.env.SAUCE_USER || 'standard_user', process.env.SAUCE_PASSWORD || 'secret_sauce');
  await expect(page.getByTestId('title')).toHaveText('Products');
  await page.context().storageState({ path: authFile });
});
