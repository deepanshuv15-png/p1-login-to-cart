import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// These tests check the login screen itself, so they start logged OUT.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test('valid user lands on Products', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('locked-out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('locked_out_user', 'secret_sauce');

    await expect(login.error).toContainText('Sorry, this user has been locked out.');
  });

  test('empty form asks for a username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.loginButton.click();

    await expect(login.error).toContainText('Username is required');
  });
});
