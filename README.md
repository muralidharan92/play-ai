# Play AI

Run Playwright tests efficiently using AI.

## Installation

1. Install the `play-ai` package as a development dependency:

```bash
npm install -D play-ai
```

2. Set up OpenAI API key:

```bash
export OPENAI_API_KEY='sk-...'
```

3. Set up maximum task prompt character count (by default set to 2000):

```bash
export MAX_TASK_CHARS='2000'
```

4. Import and use the `play` function in your test scripts:

```ts
import { expect, test, Page } from "@playwright/test";
import { play } from "play-ai";
import * as dotenv from "dotenv";

dotenv.config();
const options = undefined;

test.describe("Playwright AI Integration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("AI-Powered Playwright Test", async ({ page }) => {
    await play(
      "Type 'standard_user' in the Username field",
      { page, test },
      options
    );
    await play(
      "Type 'secret_sauce' in the Password field",
      { page, test },
      options
    );
    await play("Click the Login button", { page, test }, options);

    const headerText = await play(
      "Retrieve the header logo text",
      { page, test },
      options
    );
    expect(headerText).toBe("Swag Labs");
  });
});
```

5. You can also chain multiple prompts in the `play` function within your test scripts:

```ts
import { expect, test, Page } from "@playwright/test";
import { play } from "play-ai";
import * as dotenv from "dotenv";

const options = undefined;
dotenv.config();

test.describe("Playwright Integration With AI Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("PW With AI Test With Nested Task", async ({ page }) => {
    await play(
      [
        `Type "standard_user" in the Username field`,
        `Type "secret_sauce" in the Password field`,
        `Click the Login button`,
      ],
      { page, test },
      options
    );

    const headerLabelText = await play(
      "get the header logo label text",
      { page, test },
      options
    );

    expect(headerLabelText).toBe("Swag Labs");

    const firstLinkText = await play(
      "get the first inventory item name from inventory list",
      { page, test },
      options
    );
    expect(firstLinkText).toBe("Sauce Labs Backpack");
  });
});
```

## Usage

Execute Playwright actions using plain text commands:

```ts
play("<your prompt>", { page, test });
```

### Debugging

Enable debugging with:

```ts
await play("Retrieve the header text", { page, test }, { debug: true });
```

or set:

```bash
export PLAY_AI_DEBUG=true
```

## Supported Browsers

Play AI supports all Playwright-compatible browsers.

## Configuration Options

```ts
const options = {
  debug: true,
  model: "gpt-4O",
  openaiApiKey: "sk-...",
};
```

## Why Play AI?

| Feature                        | Traditional Testing | AI-Powered Testing |
| ------------------------------ | ------------------- | ------------------ |
| **Selector Dependency**        | High                | Low                |
| **Implementation Speed**       | Slow                | Fast               |
| **Handling Complex Scenarios** | Difficult           | Easier             |

## Supported Actions

- `page.goto`
- `locator.click`
- `locator.fill`
- `locator.textContent`
- `locator.blur`
- `locator.boundingBox`
- `locator.check`
- `locator.clear`
- `locator.count`
- `locator.getAttribute`
- `locator.innerHTML`
- `locator.innerText`
- `locator.inputValue`
- `locator.isChecked`
- `locator.isEditable`
- `locator.isEnabled`
- `locator.isVisible`
- `locator.uncheck`
- `locator.dblclick`
- `locator.scrollIntoView`
- `locator.scrollIntoViewIfNeeded`
- `locator.hover`
- `locator.waitForPageLoad`
- `locator.expectToBe`
- `locator.expectNotToBe`

## Pricing

Play AI is free, but OpenAI API calls may incur costs. See OpenAI’s [pricing](https://openai.com/pricing/).

## Related Projects

| Criteria                                                                              | Play-AI | Auto Playwright | ZeroStep  |
| ------------------------------------------------------------------------------------- | ------- | --------------- | --------- |
| Uses OpenAI API                                                                       | ✅ Yes  | ✅ Yes          | ❌ No[^3] |
| Uses plain-text prompts                                                               | ✅ Yes  | ✅ Yes          | ❌ No     |
| Uses [`functions`](https://www.npmjs.com/package/openai#automated-function-calls) SDK | ✅ Yes  | ✅ Yes          | ❌ No     |
| Uses HTML sanitization                                                                | ✅ Yes  | ✅ Yes          | ❌ No     |
| Uses Playwright API                                                                   | ✅ Yes  | ✅ Yes          | ❌ No[^4] |
| Uses screenshots                                                                      | ❌ No   | ❌ No           | ✅ Yes    |
| Uses queue                                                                            | ❌ No   | ❌ No           | ✅ Yes    |
| Uses WebSockets                                                                       | ❌ No   | ❌ No           | ✅ Yes    |
| Snapshots                                                                             | HTML    | HTML            | DOM       |
| Implements parallelism                                                                | ✅ Yes  | ❌ No           | ✅ Yes    |
| Allows scrolling                                                                      | ✅ Yes  | ❌ No           | ✅ Yes    |
| Provides fixtures                                                                     | ✅ Yes  | ❌ No           | ✅ Yes    |
| License                                                                               | MIT     | MIT             | MIT       |

---

Play AI simplifies Playwright automation using natural language commands, making test creation faster and more intuitive. 🚀

<details>
  <summary>Play-AI License</summary>

```
MIT License

Copyright (c) 2025 Muralidharan Rajendran (muralidharan92)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

</details>
