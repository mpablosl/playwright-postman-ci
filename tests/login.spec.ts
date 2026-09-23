import {test, expect} from '@playwright/test';

test("TC-LOGIN-001 - Deve realizar login com credenciais válidas", async ({page}) => {
    await page.goto('/'); 

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');    
});

test("TC-LOGIN-002 - Deve exibir mensagem de erro ao tentar realizar login com credenciais inválidas", async ({page}) => {

    await page.goto('/');

    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('invalid_password');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();    

});

test("TC-LOGIN-003 - Não deve realizar login com senha inválida", async ({page}) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('invalid_password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test("TC-LOGIN-004 - Não deve realizar login com usuário inválido", async ({page}) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});

test("TC-LOGIN-004 - Validar Login com usuário inexistente", async ({ page }) => {

    await page.goto('/');

    await page.locator('[data-test="username"]').fill('');
    await page.locator('[data-test="password"]').fill('');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();

});