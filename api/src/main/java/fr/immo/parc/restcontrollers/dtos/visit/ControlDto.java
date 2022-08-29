package fr.immo.parc.restcontrollers.dtos.visit;

import java.util.List;

import lombok.Data;

@Data
public class ControlDto {

	private Long id;

	private InterventionPointDto interventionPoint;

	private String answer;

	private String actionStatus;

	private List<CommentDto> comments;

}
