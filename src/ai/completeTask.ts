import OpenAI from "openai";
import { type Page, TaskMessage, TaskResult } from "./types";
import { prompt } from "./prompt";
import { createActions } from "./createActions";

const defaultDebug = process.env.PLAY_AI_DEBUG === "true";

/**
 * Completes a task using OpenAI's API and Playwright.
 *
 * This function integrates OpenAI's API with Playwright to complete a given task. It sends a prompt to OpenAI, executes the
 * actions on the Playwright `page`, and returns the result of the task execution.
 *
 * @param page - The Playwright `Page` object where the task will be executed.
 * @param task - The task message containing task details and options.
 * @returns A promise that resolves to the task result.
 * @throws Will throw an error if no function result is found.
 *
 * @example
 * ```typescript
 * import { completeTask } from "./completeTask";
 * import { Page } from "playwright";
 *
 * const page: Page = ...; // Initialize Playwright page
 * const taskMessage = {
 *   task: "Type 'standard_user' in the Username field",
 *   options: {
 *     openaiApiKey: "sk-...",
 *     model: "gpt-4o",
 *     debug: true,
 *   },
 * };
 *
 * const result = await completeTask(page, taskMessage);
 * console.log(result); // Logs the result of the task execution
 * ```
 */
export const completeTask = async (
    page: Page,
    task: TaskMessage
): Promise<TaskResult> => {
    const openai = new OpenAI({
        apiKey: task.options?.openaiApiKey,
        baseURL: task.options?.openaiBaseUrl,
        defaultQuery: task.options?.openaiDefaultQuery,
        defaultHeaders: task.options?.openaiDefaultHeaders
    });

    let lastFunctionResult:
        | null
        | { errorMessage: string }
        | { query: string } = null;

    const actions = createActions(page);

    const debug = task.options?.debug ?? defaultDebug;

    const runner = openai.beta.chat.completions
        .runTools({
            model: task.options?.model ?? "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: prompt(task)
                }
            ],
            tools: Object.values(actions).map((action) => ({
                type: "function",
                function: action
            }))
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
