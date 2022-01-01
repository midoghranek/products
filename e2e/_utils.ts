import { Page } from "@playwright/test";

export const BASE_URL = "https://gh-products.herokuapp.com";

export async function loginE2E(page: Page, role?: "manager" | "editor") {
  await page.type(
    "input[name=username]",
    role === "editor" ? "ahmed" : "khaled"
  );
  await page.type(
    "input[name=password]",
    role === "editor" ? "@hmed" : "kh@led"
  );
  await page.click('button[data-testid="login-button"]');
  await page.waitForNavigation();
}
