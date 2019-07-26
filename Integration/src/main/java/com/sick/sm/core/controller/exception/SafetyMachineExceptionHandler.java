package com.sick.sm.core.controller.exception;

import java.io.IOException;
import java.sql.Timestamp;
import javax.persistence.EntityExistsException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.sick.sm.core.controller.constants.ResponseMessageConstant;
import com.sick.sm.core.service.exception.InvalidRequestException;

/**
 * The Class SafetyMachineExceptionHandler .
 */
@ControllerAdvice
public class SafetyMachineExceptionHandler {

  /** The Constant logger. */
  private static final Logger logger = LoggerFactory.getLogger(SafetyMachineExceptionHandler.class);

  /** The timestamp. */
  protected Timestamp timestamp = new Timestamp(System.currentTimeMillis());

  /**
   * Handle entity exists exception.
   *
   * @param e the e
   * @param request the request
   * @param headerResponse the header response
   * @return the response entity
   * @throws IOException Signals that an I/O exception has occurred.
   */
  @ExceptionHandler(EntityExistsException.class)
  protected ResponseEntity<SafetyMachineExceptionInfo> handleEntityExistsException(Exception e,
      HttpServletRequest request, HttpServletResponse headerResponse) throws IOException {

    SafetyMachineExceptionInfo response = new SafetyMachineExceptionInfo();
    response.setTimestamp(timestamp.getTime());
    response.setUrl(request.getRequestURL().toString());
    response.setCode(HttpStatus.CONFLICT.toString());
    response.setMessage(e.getLocalizedMessage());
    headerResponse.sendError(HttpStatus.CONFLICT.value());
    return new ResponseEntity<>(response, HttpStatus.CONFLICT);
  }

  /**
   * Handle number format exception.
   *
   * @param e the e
   * @param request the request
   * @param headerResponse the header response
   * @return the response entity
   */
  @ExceptionHandler(NumberFormatException.class)
  protected ResponseEntity<SafetyMachineExceptionInfo> handleNumberFormatException(Exception e,
      HttpServletRequest request, HttpServletResponse headerResponse) {
    if (logger.isInfoEnabled()) {
      logger.error("NumberFormatException thrown..", e.getMessage());
    }
    SafetyMachineExceptionInfo response = new SafetyMachineExceptionInfo();
    response.setTimestamp(timestamp.getTime());
    response.setUrl(request.getRequestURL().toString());
    response.setCode(HttpStatus.OK.toString());
    response.setMessage(e.getLocalizedMessage());
    response.setMessage(ResponseMessageConstant.INVALID_INPUT);
    response.setCode(HttpStatus.BAD_REQUEST.toString());
    logger.error("{}", e);

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  /**
   * Handle invalid request exception.
   *
   * @param e the e
   * @param request the request
   * @param headerResponse the header response
   * @return the response entity
   * @throws IOException Signals that an I/O exception has occurred.
   */
  @ExceptionHandler(InvalidRequestException.class)
  protected ResponseEntity<SafetyMachineExceptionInfo> handleInvalidRequestException(Exception e,
      HttpServletRequest request, HttpServletResponse headerResponse) throws IOException {
    if (logger.isInfoEnabled()) {
      logger.error("InvalidRequestException thrown..", e.getMessage());
    }

    SafetyMachineExceptionInfo response = new SafetyMachineExceptionInfo();
    response.setTimestamp(timestamp.getTime());
    response.setUrl(request.getRequestURL().toString());
    response.setCode(HttpStatus.PRECONDITION_FAILED.toString());
    response.setMessage(e.getLocalizedMessage());
    headerResponse.sendError(HttpStatus.PRECONDITION_FAILED.value());
    logger.error("{}", e);
    return new ResponseEntity<>(response, HttpStatus.PRECONDITION_FAILED);
  }

}
