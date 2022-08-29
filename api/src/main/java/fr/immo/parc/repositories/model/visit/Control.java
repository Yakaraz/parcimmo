package fr.immo.parc.repositories.model.visit;

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

import lombok.Data;

@Data
@Entity
@Table(name = "ti_control")
public class Control {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "control_id", updatable = false, nullable = false)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "control_visit_id")
	private Visit visit;

	@OneToOne
	@JoinColumn(name = "control_intervention_point_id")
	private InterventionPoint interventionPoint;

	@Column(name = "control_answer")
	private String answer;

	@Column(name = "control_status")
	private String actionStatus;

	@OneToMany(mappedBy = "control", cascade = CascadeType.PERSIST, orphanRemoval = true)
	private List<Comment> comments;

}
