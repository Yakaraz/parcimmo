package fr.immo.parc.exceptions;

public class UserNotFoundException extends RuntimeException {

	public UserNotFoundException(Long id) {
		super("user id not found : " + id);

	}

}
