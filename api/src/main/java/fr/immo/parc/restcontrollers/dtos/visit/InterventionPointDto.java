package fr.immo.parc.restcontrollers.dtos.visit;

import lombok.Data;

@Data
public class InterventionPointDto {

	private Long id;

	private SectionDto section;

	private String label;

	private String answerType;

	private Integer position;

}
