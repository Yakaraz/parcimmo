package fr.immo.parc.restcontrollers.dtos.bien.read;

import java.io.Serializable;

import lombok.Data;

@Data
public class AdresseDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6984258098603246480L;

	private String rue;

	private String rue2;

	private String codePostal;

	private String ville;
}
