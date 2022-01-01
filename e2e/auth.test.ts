import { expect, test } from "@playwright/test";
import { BASE_URL, loginE2E } from "./_utils";

test("Login/Logout testing", async ({ page }) => {
  // test home redirect to login
  await page.goto(BASE_URL);
  expect(page.url()).toBe(BASE_URL + "/en/login");

  // test login validations
  await page.click('button[data-testid="login-button"]');
  expect(page.locator("text: 'Username is required'")).toBeTruthy();
  expect(page.locator("text: 'Password is required'")).toBeTruthy();

  // test login
  await loginE2E(page);
  expect(page.url()).toBe(BASE_URL + "/en");

  // test logout
  await page.click("button:has-text('Logout')");
  await page.waitForNavigation();
  expect(page.url()).toBe(BASE_URL + "/en/login");
});
