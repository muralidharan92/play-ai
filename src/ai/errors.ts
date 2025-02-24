/**
 * Base class for all custom errors in the Play AI framework.
 *
 * This abstract class serves as the base for all custom error types in the Play AI framework. It extends the built-in `Error` class
 * and provides a consistent structure for error handling within the framework.
 *
 * @export
 * @abstract
 * @class PlayAIError
 * @extends {Error}
 */
export abstract class PlayAIError extends Error {
    /**
     * Creates an instance of PlayAIError.
     *
     * @param {string} [message] - The error message.
     */
    public constructor(message?: string) {
        super(message);
        this.name = new.target.name;
    }
}

/**
 * Error class for unimplemented features in the Play AI framework.
 *
 * This class represents an error that is thrown when a feature is not yet implemented in the Play AI framework. It extends the
 * `PlayAIError` class and provides a default error message.
 *
 * @export
 * @class UnimplementedError
 * @extends {PlayAIError}
 */
export class UnimplementedError extends PlayAIError {
    /**
     * Creates an instance of UnimplementedError.
     *
     * @param {string} [message] - The error message. If not provided, a default message "This feature is not yet implemented." is used.
     */
    public constructor(message?: string) {
        super(message || "This feature is not yet implemented.");
    }
}
