package fr.immo.parc.error;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import fr.immo.parc.exceptions.InterventionPointNotFoundException;
import fr.immo.parc.exceptions.PropertyNotFoundException;
import fr.immo.parc.exceptions.TeamNotFoundException;
import fr.immo.parc.exceptions.UserAlreadyInException;
import fr.immo.parc.exceptions.UserNotFoundException;
import fr.immo.parc.exceptions.VisitNotFoundException;

@ControllerAdvice
public class GlobalExceptionsHandler extends ResponseEntityExceptionHandler {

	// Let Spring BasicErrorController handle the exception, we just override the
	// status code
	@ExceptionHandler(PropertyNotFoundException.class)
	public ResponseEntity<ErrorResponse> propertyHandleNotFound(Exception ex, WebRequest request) {

		ErrorResponse errors = new ErrorResponse();
		errors.setTimestamp(LocalDateTime.now());
		errors.setError(ex.getMessage());
		errors.setStatus(HttpStatus.NOT_FOUND.value());

		return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);

	}

	@ExceptionHandler(VisitNotFoundException.class)
	public ResponseEntity<ErrorResponse> visitHandleNotFound(Exception ex, WebRequest request) {
		ErrorResponse errors = new ErrorResponse();
		errors.setTimestamp(LocalDateTime.now());
		errors.setError(ex.getMessage());
		errors.setStatus(HttpStatus.NOT_FOUND.value());

		return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);

	}

	@ExceptionHandler(InterventionPointNotFoundException.class)
	public ResponseEntity<ErrorResponse> interventionPointHandleNotFound(Exception ex, WebRequest request) {
		ErrorResponse errors = new ErrorResponse();
		errors.setTimestamp(LocalDateTime.now());
		errors.setError(ex.getMessage());
		errors.setStatus(HttpStatus.NOT_FOUND.value());

		return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);

	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponse> userHandleNotFound(Exception ex, WebRequest request) {

		ErrorResponse errors = new ErrorResponse();
		errors.setTimestamp(LocalDateTime.now());
		errors.setError(ex.getMessage());
		errors.setStatus(HttpStatus.NOT_FOUND.value());

		return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);

	}

	@ExceptionHandler(UserAlreadyInException.class)
	public ResponseEntity<ErrorResponse> userAlreadyInHandle(Exception ex, WebRequest request) {

		ErrorResponse errors = new ErrorResponse();
		errors.setTimestamp(LocalDateTime.now());
		errors.setError(ex.getMessage());
		errors.setStatus(HttpStatus.BAD_REQUEST.value());

		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);

	}

	@ExceptionHandler(TeamNotFoundException.class)
	public ResponseEntity<ErrorResponse> teamHandleNotFound(Exception ex, WebRequest request) {

		ErrorResponse errors = new ErrorResponse();
		errors.setTimestamp(LocalDateTime.now());
		errors.setError(ex.getMessage());
		errors.setStatus(HttpStatus.BAD_REQUEST.value());

		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);

	}
	

	// @Validate For Validating Path Variables and Request Parameters
	@ExceptionHandler(ConstraintViolationException.class)
	public void constraintViolationException(HttpServletResponse response) throws IOException {
		response.sendError(HttpStatus.BAD_REQUEST.value());
	}

	// error handle for @Valid
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		Map<String, Object> body = new LinkedHashMap<>();
		body.put("timestamp", new Date());
		body.put("status", status.value());

		// Get all fields errors
		List<String> errors = ex.getBindingResult().getFieldErrors().stream().map(x -> x.getField() + " " + x.getDefaultMessage() )
				.collect(Collectors.toList());

		body.put("errors", errors);

		return new ResponseEntity<>(body, headers, status);

	}

}
