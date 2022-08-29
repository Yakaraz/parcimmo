package fr.immo.parc.restcontrollers.dtos.visit.newvisit;

import java.time.LocalDate;

import fr.immo.parc.restcontrollers.dtos.user.ApplicationUserDto;
import lombok.Data;

@Data
public class NewCommentDto {
	
	private Long id;

	private String text;

//	private List<File> pictures;
//
//	private List<String> picturesUrl;

	private ApplicationUserDto author;

	private LocalDate createdAt;

}
