/**
 * Base class for all custom errors in the Play AI framework.
 *
 * @export
 * @abstract
 * @class PlayAIError
 * @extends {Error}
 */
export abstract class PlayAIError extends Error {
  public constructor(message?: string) {
    super(message);
    this.name = new.target.name;
  }
}

/**
 * Error class for unimplemented features in the Play AI framework.
 *
 * @export
 * @class UnimplementedError
 * @extends {PlayAIError}
 */
export class UnimplementedError extends PlayAIError {
  public constructor(message?: string) {
    super(message || "This feature is not yet implemented.");
  }
}
