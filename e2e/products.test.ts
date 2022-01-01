import { expect, test } from "@playwright/test";
import { BASE_URL, loginE2E } from "./_utils";

test("Products e2e testing", async ({ page }) => {
  await page.goto(BASE_URL);
  await loginE2E(page);

  // add new product
  await page.click("button:has-text('New Product')");
  await page.waitForSelector("input[name=name]");
  await page.type("input[name='name']", "test product");
  await page.type("input[name='translations.ar.name']", "test product ar");
  await page.type("input[name='weight']", "33KG");
  await page.type(
    "input[name=thumbnail]",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  );
  await page.click("button[title='Open']");
  await page.click(".MuiAutocomplete-popper li[data-option-index='0']");
  await page.click("button:has-text('Add Product')");
  await page.waitForResponse(`${BASE_URL}/api/products`);
  expect(page.locator("h6:has-text('test product')")).toBeTruthy();
});
