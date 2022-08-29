package fr.immo.parc.repositories.model.visit;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import fr.immo.parc.repositories.model.user.ApplicationUser;
import lombok.Data;

@Data
@Entity
@Table(name = "ti_comment")
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id", updatable = false, nullable = false)
	private Long id;

	@Column(name = "comment_text")
	private String text;

//	private List<File> pictures;
//
//	private List<String> picturesUrl;

	@OneToOne
	@JoinColumn(name = "comment_user_id")
	private ApplicationUser author;

	@Column(name = "comment_created_at")
	private LocalDate createdAt;

	@ManyToOne
	@JoinColumn(name = "comment_control_id")
	private Control control;

}
