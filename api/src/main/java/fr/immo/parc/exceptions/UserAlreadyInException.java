package fr.immo.parc.exceptions;

public class UserAlreadyInException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1320358128407825210L;

	public UserAlreadyInException(Long id) {
		super("user is already setted in the property : " + id);
	}
}
