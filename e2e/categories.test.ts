import { expect, test } from "@playwright/test";
import { BASE_URL, loginE2E } from "./_utils";

test("Categories e2e testing", async ({ page }) => {
  await page.goto(BASE_URL);
  await loginE2E(page, "manager");

  // test categories module for managers
  expect(page.locator("button:has-text('Manage Categories')")).toBeVisible();
  await page.click("button:has-text('Manage Categories')");
  await page.waitForNavigation();
  expect(page.url()).toBe(`${BASE_URL}/en/categories`);

  // add new category
  await page.type("input[name='name']", "test categories");
  await page.type("input[name='translations.ar.name']", "test categories ar");
  await page.click("button:has-text('Add Category')");
  await page.waitForResponse(`${BASE_URL}/api/categories`);
  const selector = "span:has-text('test categories')";
  await page.waitForSelector(selector, { timeout: 2000 });
  expect(page.locator(selector)).toBeVisible();

  // delete category
  await page.click(`svg[data-testid='DeleteIcon']:near(${selector})`);
  await page.click("button:has-text('Confirm')");
  await page.waitForResponse(`${BASE_URL}/api/categories`);
  await page.waitForSelector(selector, {
    state: "detached",
    timeout: 2000,
  });
});
