package fr.immo.parc.restcontrollers.dtos.visit;

import java.time.LocalDate;

import fr.immo.parc.restcontrollers.dtos.user.ApplicationUserDto;
import lombok.Data;

@Data
public class CommentDto {

	private Long id;

	private String text;

//	private List<File> pictures;
//
//	private List<String> picturesUrl;

	private ApplicationUserDto author;

	private LocalDate createdAt;

}
