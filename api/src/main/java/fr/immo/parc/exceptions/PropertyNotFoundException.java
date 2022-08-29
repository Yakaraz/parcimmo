package fr.immo.parc.exceptions;

public class PropertyNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2451384985227169201L;

	public PropertyNotFoundException(Long id) {
		super("Property id not found : " + id);

	}

}
