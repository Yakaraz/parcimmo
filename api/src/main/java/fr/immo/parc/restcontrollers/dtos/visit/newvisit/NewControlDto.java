package fr.immo.parc.restcontrollers.dtos.visit.newvisit;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class NewControlDto {

	private Long id;

	@Valid
	@NotNull
	private NewInterventionPointDto interventionPoint;

	private String answer;

	private String actionStatus;

	private List<NewCommentDto> comments;

}
