package fr.immo.parc.restcontrollers.dtos.visit.newvisit;

import lombok.Data;

@Data
public class NewSectionDto {

	private Long id;

	private String name;

	private Boolean generic;
}
