const char_count = process.env.MAX_TASK_CHARS || "2000";
export const MAX_TASK_CHARS = parseInt(char_count, 10);
