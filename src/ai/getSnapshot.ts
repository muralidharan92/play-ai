import { sanitizeHtmlString } from "./sanitizedHtml";
import { Page } from "./types";
export const getSnapshot = async (page: Page) => {
  return {
    dom: sanitizeHtmlString(await page.content()),
  };
};
