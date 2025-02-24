import { TaskMessage } from "./types";

/**
 * Generates a prompt for OpenAI based on the provided task message.
 *
 * This function creates a formatted prompt string that includes the task description and guidelines for creating CSS selectors.
 * It also includes a snapshot of the current state of the webpage.
 *
 * @param {TaskMessage} message - The task message containing the task details and the webpage snapshot.
 * @returns {string} The formatted prompt string to be sent to OpenAI.
 *
 * @example
 * ```typescript
 * import { prompt } from "./prompt";
 * import { TaskMessage } from "./types";
 *
 * const taskMessage: TaskMessage = {
 *   task: "Type 'standard_user' in the Username field",
 *   snapshot: {
 *     dom: "<html>...</html>",
 *   },
 *   options: {
 *     openaiApiKey: "sk-...",
 *     model: "gpt-4o",
 *     debug: true,
 *   },
 * };
 *
 * const promptString = prompt(taskMessage);
 * console.log(promptString);
 * ```
 */
export const prompt = (message: TaskMessage): string => {
    return `This is your task: ${message.task}

* When creating CSS selectors, ensure they are unique and specific enough to select only one element, even if there are multiple elements of the same type (like multiple h1 elements).
* Avoid using generic tags like 'h1' alone. Instead, combine them with other attributes or structural relationships to form a unique selector.
* You must not derive data from the page if you are able to do so by using one of the provided functions, e.g. locator_evaluate.

Webpage snapshot:

\`\`\`
${message.snapshot.dom}
\`\`\`
`;
};
