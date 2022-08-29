package fr.immo.parc.restcontrollers.dtos.visit.newvisit;


import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class NewInterventionPointDto {
	
	@NotNull
	private Long id;

}
