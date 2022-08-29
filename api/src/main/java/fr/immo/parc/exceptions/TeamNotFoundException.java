package fr.immo.parc.exceptions;

public class TeamNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 105053299425596052L;

	public TeamNotFoundException(Long id) {
		super("team id not found : " + id);

	}

}
