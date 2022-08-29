package fr.immo.parc.exceptions;

public class InterventionPointNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2451384985227169201L;

	public InterventionPointNotFoundException(Long id) {
		super("InterventionPoint id not found : " + id);

	}

}
