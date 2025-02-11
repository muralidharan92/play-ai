import OpenAI from "openai";
import { type Page, TaskMessage, TaskResult } from "./types";
import { prompt } from "./prompt";
import { createActions } from "./createActions";

const defaultDebug = process.env.PLAY_AI_DEBUG === "true";

/**
 * Completes a task using OpenAI's API and Playwright.
 * @param {Page} page - The Playwright Page object.
 * @param {TaskMessage} task - The task message containing task details and options.
 * @returns {Promise<TaskResult>} A promise that resolves to the task result.
 * @throws Will throw an error if no function result is found.
 */
export const completeTask = async (
  page: Page,
  task: TaskMessage
): Promise<TaskResult> => {
  const openai = new OpenAI({
    apiKey: task.options?.openaiApiKey,
    baseURL: task.options?.openaiBaseUrl,
    defaultQuery: task.options?.openaiDefaultQuery,
    defaultHeaders: task.options?.openaiDefaultHeaders,
  });

  let lastFunctionResult: null | { errorMessage: string } | { query: string } =
    null;

  const actions = createActions(page);

  const debug = task.options?.debug ?? defaultDebug;

  const runner = openai.beta.chat.completions
    .runTools({
      model: task.options?.model ?? "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt(task),
        },
      ],
      tools: Object.values(actions).map((action) => ({
        type: "function",
        function: action,
      })),
    })
    .on("message", (message) => {
      if (debug) {
        console.log("> Message", message);
      }

      if (
        message.role === "assistant" &&
        message.tool_calls &&
        message.tool_calls.length > 0 &&
        message.tool_calls[0].function.arguments
      ) {
        lastFunctionResult = JSON.parse(
          message.tool_calls[0].function.arguments
        );
      }
    });

  const finalContent = await runner.finalContent();

  if (debug) {
    console.log("> finalContent", finalContent);
  }

  if (!lastFunctionResult) {
    throw new Error("No function result found.");
  }

  if (debug) {
    console.log("> lastFunctionResult", lastFunctionResult);
  }

  return lastFunctionResult;
};
