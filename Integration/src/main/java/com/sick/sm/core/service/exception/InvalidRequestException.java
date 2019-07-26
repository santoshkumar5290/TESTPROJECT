package com.sick.sm.core.service.exception;

/**
 * The Class InvalidRequestException.
 */
public class InvalidRequestException extends Exception {

  /** The Constant serialVersionUID. */
  private static final long serialVersionUID = -7204538102635557928L;

  /**
   * Instantiates a new invalid request exception.
   *
   * @param message the message
   */
  public InvalidRequestException(String message) {
    super(message);
  }

}
