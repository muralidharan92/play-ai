const char_count = process.env.MAX_TASK_CHARS || "2000";
/**
 * Retrieves the maximum number of characters allowed for a task from the environment variable `MAX_TASK_CHARS`.
 * If the environment variable is not set, it defaults to "2000".
 *
 * This constant is used to ensure that tasks do not exceed a specified character limit, which can be important for
 * maintaining performance and avoiding issues with excessively large tasks.
 *
 * @constant
 * @type {number}
 * @default 2000
 * @example
 * ```typescript
 * import { MAX_TASK_CHARS } from "./config";
 *
 * console.log(MAX_TASK_CHARS); // Outputs the maximum number of characters allowed for a task, e.g., 2000
 * ```
 */
export const MAX_TASK_CHARS = parseInt(char_count, 10);
