package fr.immo.parc.restcontrollers.dtos.bien.write;

import java.io.Serializable;
import java.time.LocalDate;

import lombok.Data;

@Data
public class BienDTOW implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3781911276347948788L;
	
	private Long id ;
	
	private LocalDate planifiedAt;

}