package fr.immo.parc.repositories.model.visit;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import fr.immo.parc.repositories.model.property.Bien;
import fr.immo.parc.repositories.model.user.ApplicationUser;
import lombok.Data;

@Data
@Entity
@Table(name = "ti_visit")
public class Visit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "visit_id", updatable = false, nullable = false)
	private Long id;

	@ManyToOne
	@JoinColumn(name="visit_property_id")
	private Bien property;

	@OneToOne
	@JoinColumn(name = "visit_user_id")
	private ApplicationUser author;

	@OneToMany(mappedBy = "visit", cascade = CascadeType.PERSIST, orphanRemoval = true)
	private List<Control> controls;

	@Column(name="visit_rentable")
	private String rentable;
	
	@Column(name = "visit_created_at")
	private LocalDate createdAt;

	/**
	 * FR: Désordre ou travaux à prévoir.
	 *
	 * @var string|null
	 */
	
	@Column(name="visit_workToBePlanned")
	private String workToBePlanned;
//
//	    /**·
//	     * @var iterable
//	     */
//	    private List $workToBePlannedPictures = [];
//
//	    /**
//	     * @var iterable
//	     */
//	    private $workToBePlannedPicturesUrl;

}
