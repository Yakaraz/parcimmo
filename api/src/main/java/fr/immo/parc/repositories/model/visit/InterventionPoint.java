package fr.immo.parc.repositories.model.visit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "ti_intervention_point")
public class InterventionPoint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "intervention_point_id", updatable = false, nullable = false)
	private Long id;

	@OneToOne
	@JoinColumn(name = "intervention_point_section_id")
	private Section section;

	@Column(name = "intervention_point_label")
	private String label;

	@Column(name = "intervention_point_answertype")
	private String answerType;

	@Column(name = "intervention_point_position")
	private Integer position;

}
