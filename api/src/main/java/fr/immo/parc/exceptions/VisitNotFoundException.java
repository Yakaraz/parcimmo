package fr.immo.parc.exceptions;

public class VisitNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5368093760170574341L;

	/**
	 * 
	 */

	public VisitNotFoundException(Long id) {
		super("Visit id not found : " + id);

	}

}
