package fr.immo.parc.repositories.model.user;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import fr.immo.parc.repositories.model.property.Bien;
import lombok.Data;

@Entity
@Data
@Table(name = "ti_user")
public class ApplicationUser {


	public ApplicationUser() {
	}

	public ApplicationUser(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long id;

	@Column(name = "user_email")
	private String email;

	@Column(name = "user_username")
	private String username;

	@Column(name = "user_firstname")
	private String firstName;

	@Column(name = "user_lastname")
	private String lastName;

	@Column(name = "user_fullname")
	private String fullName;

	@Column(name = "user_password")
	private String password;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "ti_user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> role = new HashSet<>();

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL })
	@JoinTable(name = "ti_user_team", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
			@JoinColumn(name = "team_id") })
	private List<Team> teams;

	/**
	 * FR: Propriété que gère l'utilisateur (cas du GESTPR/GESTIM).
	 *
	 * @var iterable
	 */
	@ManyToMany(mappedBy = "users")
	private List<Bien> properties;

	@Column(name = "user_enabled")
	private Boolean enabled;

	@Column(name = "user_token")
	private String token;

	@Column(name = "user_refreshtoken")
	private String refreshToken;

	@Column(name = "user_refreshtoken_createdat")
	private Date refreshTokenCreatedAt;
}
