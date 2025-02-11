import { TaskMessage } from "./types";

export const prompt = (message: TaskMessage) => {
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
