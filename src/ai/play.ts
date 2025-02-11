import { MAX_TASK_CHARS } from "./config";
import { type Page, type Test, StepOptions } from "./types";
import { completeTask } from "./completeTask";
import { getSnapshot } from "./getSnapshot";
import { UnimplementedError } from "./errors";

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
