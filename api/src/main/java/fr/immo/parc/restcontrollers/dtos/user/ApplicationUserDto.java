package fr.immo.parc.restcontrollers.dtos.user;

import java.io.Serializable;

import lombok.Data;

@Data
public class ApplicationUserDto implements Serializable {

	private static final long serialVersionUID = -1081977409838820747L;
	
	private Long id;

	private String email;

	private String username;

	private String firstName;

	private String lastName;

	private String fullName;

}
