package fr.immo.parc.restcontrollers.dtos.visit;

import java.time.LocalDate;
import java.util.List;

import fr.immo.parc.restcontrollers.dtos.user.ApplicationUserDto;
import lombok.Data;

@Data
public class VisitDto {

	private Long id;

	private ApplicationUserDto author;

	private List<ControlDto> controls;

	private String rentable;

	private String workToBePlanned;
	
	private LocalDate createdAt;

}
