package fr.immo.parc.restcontrollers.dtos.team;

import java.io.Serializable;

import lombok.Data;

@Data
public class TeamDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2658286398869102037L;

	private Long id;

	private String code;

	private String name;

}
