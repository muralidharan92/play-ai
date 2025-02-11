import { expect, test, Page } from "@playwright/test";
import { play } from "../src/ai/play";
import * as dotenv from "dotenv";

const options = undefined;
dotenv.config();

test.describe("Playwright Integration With AI Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("PW With AI Test", async ({ page }) => {
    await play(
      `Type "standard_user" in the Username field`,
      { page, test },
      options
    );
    await play(
      `Type "secret_sauce" in the Password field`,
      { page, test },
      options
    );
    await play(
      "Click the Login button",
      {
        page,
        test,
      },
      options
    );

    const headerLabelText = await play(
      "get the header logo label text",
      { page, test },
      options
    );

    expect(headerLabelText).toBe("Swag Labs");

    const firstLinkText = await play(
      "get the first inventory item name from inventory list",
      { page, test },
      options
    );
    expect(firstLinkText).toBe("Sauce Labs Backpack");
  });

  test("PW With AI Test With Nested Task", async ({ page }) => {
    // await page.goto("https://www.saucedemo.com/");

    await play(
      [
        `Type "standard_user" in the Username field`,
        `Type "secret_sauce" in the Password field`,
        `Click the Login button`,
      ],
      { page, test },
      options
    );

    const headerLabelText = await play(
      "get the header logo label text",
      { page, test },
      options
    );

    expect(headerLabelText).toBe("Swag Labs");

    const firstLinkText = await play(
      "get the first inventory item name from inventory list",
      { page, test },
      options
    );
    expect(firstLinkText).toBe("Sauce Labs Backpack");
  });
});
