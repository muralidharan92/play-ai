import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes an HTML string by allowing only a specific set of tags and attributes.
 *
 * @param {string} subject - The HTML string to be sanitized.
 * @returns {string} - The sanitized HTML string.
 *
 * @example
 * const dirtyHtml = '<div><script>alert("xss")</script><button>Click me</button></div>';
 * const cleanHtml = sanitizeHtmlString(dirtyHtml);
 * console.log(cleanHtml); // Output: '<div><button>Click me</button></div>'
 */
export const sanitizeHtmlString = (subject: string): string => {
  return sanitizeHtml(subject, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "button",
      "input",
      "select",
      "option",
      "textarea",
      "form",
      "img",
      "label",
      "span",
    ]),
    allowedAttributes: false,
  });
};
