import { type TestType } from "@playwright/test";

export { type Page } from "@playwright/test";

export type Test = TestType<any, any>;

/**
 * Options for configuring a step.
 * 
 * @typedef {Object} StepOptions
 * @property {boolean} [debug] - Whether to enable debug mode.
 * @property {string} [model] - The model to use.
 * @property {string} [openaiApiKey] - The OpenAI API key.
 * @property {string} [openaiBaseUrl] - The base URL for OpenAI API.
 * @property {Object} [openaiDefaultQuery] - The default query parameters for OpenAI API.
 * @property {Object} [openaiDefaultHeaders] - The default headers for OpenAI API.
 */
export type StepOptions = {
  debug?: boolean;
  model?: string;
  openaiApiKey?: string;
  openaiBaseUrl?: string;
  openaiDefaultQuery?: {};
  openaiDefaultHeaders?: {};
};

/**
 * Message for a task.
 * 
 * @typedef {Object} TaskMessage
 * @property {string} task - The task description.
 * @property {Object} snapshot - The snapshot of the DOM.
 * @property {string} snapshot.dom - The DOM as a string.
 * @property {StepOptions} options - The options for the step.
 */
export type TaskMessage = {
  task: string | string[];
  snapshot: {
    dom: string;
  };
  options?: StepOptions;
};

/**
 * Result of a task.
 * 
 * @typedef {Object} TaskResult
 * @property {boolean} [assertion] - The result of an assertion.
 * @property {string} [query] - The query string.
 * @property {string} [errorMessage] - The error message, if any.
 */
export type TaskResult = {
  assertion?: boolean;
  query?: string;
  errorMessage?: string;
};
