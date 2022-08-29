package fr.immo.parc.repositories.model.user;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import fr.immo.parc.repositories.model.property.Bien;
import lombok.Data;

@Entity
@Data
@Table(name = "ti_team")
public class Team {

	@Id
	@Column(name = "team_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * @var string
	 */
	@Column(name = "team_code")
	private String code;

	/**
	 * @var string
	 */
	@Column(name = "team_name")
	private String name;

	/**
	 * @var bool
	 */
	@Column(name = "team_enabled")
	private Boolean enabled;
	
	@ManyToMany(mappedBy = "teams")
	private List<ApplicationUser> users;

}
