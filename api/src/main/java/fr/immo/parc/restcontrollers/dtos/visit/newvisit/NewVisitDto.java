package fr.immo.parc.restcontrollers.dtos.visit.newvisit;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Size;

import fr.immo.parc.restcontrollers.dtos.user.ApplicationUserDto;
import lombok.Data;

@Data
public class NewVisitDto {

	private Long id;

	private ApplicationUserDto author;

	@Valid
	@Size(min = 18, max = 18)
	private List<NewControlDto> controls;

	private String rentable;

	private String workToBePlanned;

}
