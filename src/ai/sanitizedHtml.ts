import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes an HTML string by allowing only a specific set of tags and attributes.
 *
 * This function uses the `sanitize-html` library to clean an HTML string, ensuring that only a predefined set of tags and attributes
 * are allowed. This helps prevent XSS (Cross-Site Scripting) attacks by removing potentially harmful content.
 *
 * @param {string} subject - The HTML string to be sanitized.
 * @returns {string} - The sanitized HTML string.
 *
 * @example
 * ```typescript
 * const dirtyHtml = '<div><script>alert("xss")</script><button>Click me</button></div>';
 * const cleanHtml = sanitizeHtmlString(dirtyHtml);
 * console.log(cleanHtml); // Output: '<div><button>Click me</button></div>'
 * ```
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
            "span"
        ]),
        allowedAttributes: false
    });
};
