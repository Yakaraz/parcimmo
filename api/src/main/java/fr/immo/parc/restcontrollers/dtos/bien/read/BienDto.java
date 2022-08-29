package fr.immo.parc.restcontrollers.dtos.bien.read;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import fr.immo.parc.restcontrollers.dtos.team.TeamDto;
import fr.immo.parc.restcontrollers.dtos.user.ApplicationUserDto;
import fr.immo.parc.restcontrollers.dtos.visit.VisitDto;
import lombok.Data;

@Data
public class BienDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8094114932452034108L;

	private Long id;

	private String idLot;

	private String numeroCite;

	private String codeImmeuble;

	private String codeBatiment;

	private String codeLot;

	private AdresseDto adresse = null;

	private String type;

	private Integer nombrePieces;

	private String etatDuLot;

	private LocalDate nextComputationAt;

	private LocalDate scheduledVisitAt;

	private String scheduledVisitStatus;

	private LocalDate planifiedAt;

	private BigDecimal surface;

	private String gazDeliveryPoint;

	private String electricDeliveryPoint;

	private String businessUnit;

	private String businessSubUnit;

	private List<TeamDto> teams;

	private List<ApplicationUserDto> users;
	
	private List<VisitDto> visits;

	private int nbNeededActions;
}