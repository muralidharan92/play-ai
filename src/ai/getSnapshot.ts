import { sanitizeHtmlString } from "./sanitizedHtml";
import { Page } from "./types";

/**
 * Captures a snapshot of the current state of the Playwright `page`.
 *
 * This function retrieves the HTML content of the provided `page`, sanitizes it to remove any potentially harmful content,
 * and returns an object containing the sanitized DOM string.
 *
 * @param page - The Playwright `page` object from which the snapshot will be taken.
 * @returns A promise that resolves to an object containing the sanitized DOM string.
 *
 * @example
 * ```typescript
 * import { getSnapshot } from "./getSnapshot";
 * import { Page } from "playwright";
 *
 * const snapshot = await getSnapshot(page);
 * console.log(snapshot.dom); // Logs the sanitized HTML content of the page
 * ```
 */
export const getSnapshot = async (page: Page) => {
    return {
        dom: sanitizeHtmlString(await page.content())
    };
};
