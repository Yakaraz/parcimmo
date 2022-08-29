package fr.immo.parc.repositories.model.visit;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "ti_section")
public class Section {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "section_id", updatable = false, nullable = false)
	private Long id;

	@Column(name = "section_name")
	private String name;

	@Column(name = "section_generic")
	private Boolean generic;
}
