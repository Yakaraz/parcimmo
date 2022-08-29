package fr.immo.parc.repositories.model.property;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import fr.immo.parc.repositories.model.bien.embeddable.Adresse;
import fr.immo.parc.repositories.model.user.ApplicationUser;
import fr.immo.parc.repositories.model.user.Team;
import fr.immo.parc.repositories.model.visit.Visit;
import lombok.Data;

@Data
@Entity
@Table(name = "ti_property")
public class Bien implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3230846082789377741L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "property_id", updatable = false, nullable = false)
	private Long id;

	/**
	 * FR: Numéro IDLOT.
	 *
	 * @var string|null
	 */
	@Column(name = "property_identifiant")
	private String idLot;

	/**
	 * FR: Numéro CITE. cite
	 * 
	 * @var string|null
	 */
	@Column(name = "property_cite")
	private String numeroCite;

	/**
	 * FR: Code immeuble. propertyCode
	 * 
	 * @var string|null
	 */
	@Column(name = "property_property_code")
	private String codeImmeuble;

	/**
	 * FR: Code batiment. $buildingCode
	 * 
	 * @var string|null
	 */
	@Column(name = "property_building_code")
	private String codeBatiment;

	/**
	 * FR: Code lot. unitCode
	 *
	 * @var string|null
	 */

	@Column(name = "property_unit_code")
	private String codeLot;

	/**
	 * FR: Adresse du lot.
	 *
	 */
	@Embedded
	@AttributeOverrides({ @AttributeOverride(name = "rue", column = @Column(name = "property_street")),
			@AttributeOverride(name = "rue2", column = @Column(name = "property_street2")),
			@AttributeOverride(name = "codePostal", column = @Column(name = "property_postalcode")),
			@AttributeOverride(name = "ville", column = @Column(name = "property_city")) })
	private Adresse adresse = null;

	/**
	 * FR: Type de lot.
	 *
	 * @var string|null
	 */
	@Column(name = "property_type")
	private String type;

	/**
	 * FR: Nombre de pièces. roomNumber
	 * 
	 * @var int|null
	 */
	@Column(name = "property_room_number")
	private Integer nombrePieces;

	/**
	 * FR: Etat du lot (vacant, ...). occupancy
	 * 
	 * @var string|null
	 */
	@Column(name = "property_occupancy")
	private String etatDuLot;


	/**
	 * FR: A visiter le.
	 *
	 * @var \LocalDateTimeImmutable|null
	 */
	@Column(name = "property_scheduled_visit_at")
	private LocalDate scheduledVisitAt;

	/**
	 * FR: Statut de visite du lot.
	 *
	 * @var string|null
	 */
	@Column(name = "property_scheduled_visit_status")
	private String scheduledVisitStatus;

	/**
	 * FR: Planifié le.
	 *
	 * @var \LocalDateTimeImmutable|null
	 */
	@Column(name = "property_scheduled_planified_at")
	private LocalDate planifiedAt;

	/**
	 * FR: Surface.
	 *
	 * @var string|null Note : This data is stored as decimal(13,2) via ORM
	 *      Infrastructure
	 */
	@Column(name = "property_surface", precision = 13, scale = 2)
	private BigDecimal surface;

	/**
	 * FR: PDL Gaz.
	 *
	 * @var string|null
	 */
	@Column(name = "property_gaz_delivery_point")
	private String gazDeliveryPoint;

	/**
	 * FR: PDL Electrique.
	 *
	 * @var string|null
	 */
	@Column(name = "property_electric_delivery_point")
	private String electricDeliveryPoint;

	
	@OneToMany(mappedBy ="property")
	private List<Visit> visits = new ArrayList<Visit>();

	/**
	 * FR: Groupe(s) de rattachement.
	 *
	 * @var iterable
	 */
	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL })
	@JoinTable(name = "ti_property_team", joinColumns = { @JoinColumn(name = "property_id") }, inverseJoinColumns = {
			@JoinColumn(name = "team_id") })
	private List<Team> teams = new ArrayList<Team>();

	/**
	 * FR: Utilisateurs rattachés à la Propriété.
	 *
	 * @var iterable
	 */

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL })
	@JoinTable(name = "ti_property_user", joinColumns = { @JoinColumn(name = "property_id") }, inverseJoinColumns = {
			@JoinColumn(name = "user_id") })
	private List<ApplicationUser> users = new ArrayList<ApplicationUser>();

}