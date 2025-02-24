import { MAX_TASK_CHARS } from "./config";
import { type Page, type Test, StepOptions } from "./types";
import { completeTask } from "./completeTask";
import { getSnapshot } from "./getSnapshot";
import { UnimplementedError } from "./errors";

/**
 * Executes a task or a series of tasks using Playwright and OpenAI integration.
 *
 * This function allows you to execute a single task or an array of tasks on a Playwright `page` using OpenAI's capabilities.
 * It can be used within a Playwright test context to perform automated actions and assertions.
 *
 * @param task - A single task or an array of tasks to be executed. Each task is a string describing the action to be performed.
 * @param config - Configuration object containing the Playwright `page` and optional `test` context.
 * @param config.page - The Playwright `page` object where the tasks will be executed.
 * @param config.test - Optional Playwright `test` context for running the tasks within a test step.
 * @param options - Optional configuration for the task execution, including OpenAI settings.
 * @param options.model - The OpenAI model to be used for task execution (default is "gpt-4o").
 * @param options.debug - Boolean flag to enable debugging mode (default is false).
 * @param options.openaiApiKey - The API key for accessing OpenAI services.
 * @param options.openaiBaseUrl - The base URL for OpenAI API requests.
 * @param options.openaiDefaultQuery - Default query parameters for OpenAI requests.
 * @param options.openaiDefaultHeaders - Default headers for OpenAI requests.
 * @returns A promise that resolves with the result of the task execution. The result can include assertions, queries, or other outputs.
 * @throws {UnimplementedError} If the required `page` argument is missing in the config.
 * @throws {Error} If the task length exceeds the maximum allowed characters.
 *
 * @example
 * ```typescript
 * import { play } from "./play";
 * import { Page, Test } from "playwright";
 *
 * const page: Page = ...; // Initialize Playwright page
 * const test: Test = ...; // Initialize Playwright test context
 *
 * await play("Type 'standard_user' in the Username field", { page, test });
 * await play("Click the Login button", { page, test });
 * ```
 */
export const play = async (
  task: string | string[],
  config: { page: Page; test: Test },
  options?: StepOptions
): Promise<any> => {
  if (!config || !config.page) {
    throw new UnimplementedError(
      "The play() function is missing the required `{ page }` argument."
    );
  }

  const { test, page } = config as { test?: Test; page: Page };

  if (!test) {
    return await runTask(task, page, options);
  }

  return test.step(`play-ai '${task}'`, async () => {
    const result = await runTask(task, page, options);

    if (result.errorMessage) {
      throw new UnimplementedError(result.errorMessage);
    }

    if (result.assertion !== undefined) {
      return result.assertion;
    }

    if (result.query) {
      return result.query;
    }
    return undefined;
  });
};

/**
 * Runs a task or a series of tasks on the provided Playwright `page`.
 *
 * This helper function is responsible for executing the given tasks on the Playwright `page`. It handles the task execution
 * logic, including checking the task length and calling the `completeTask` function with the necessary parameters.
 *
 * @param task - A single task or an array of tasks to be executed. Each task is a string describing the action to be performed.
 * @param page - The Playwright `page` object where the tasks will be executed.
 * @param options - Optional configuration for the task execution, including OpenAI settings.
 * @returns A promise that resolves with the result of the task execution. The result can include assertions, queries, or other outputs.
 * @throws {Error} If the task length exceeds the maximum allowed characters.
 *
 * @example
 * ```typescript
 * import { runTask } from "./play";
 * import { Page } from "playwright";
 *
 * const page: Page = ...; // Initialize Playwright page
 *
 * const result = await runTask("Type 'standard_user' in the Username field", page, { debug: true });
 * console.log(result); // Logs the result of the task execution
 * ```
 */
async function runTask(
  task: string | string[],
  page: Page,
  options: StepOptions | undefined
) {
  if (task.length > MAX_TASK_CHARS) {
    throw new Error(
      `The task is too long. The maximum number of characters is ${MAX_TASK_CHARS}.`
    );
  }

  const result = await completeTask(page, {
    task,
    snapshot: await getSnapshot(page),
    options: options
      ? {
          model: options.model ?? "gpt-4o",
          debug: options.debug ?? false,
          openaiApiKey: options.openaiApiKey,
          openaiBaseUrl: options.openaiBaseUrl,
          openaiDefaultQuery: options.openaiDefaultQuery,
          openaiDefaultHeaders: options.openaiDefaultHeaders,
        }
      : undefined,
  });
  return result;
}
