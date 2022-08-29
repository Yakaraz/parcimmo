package fr.immo.parc.repositories.model;

import java.io.Serializable;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import fr.immo.parc.repositories.model.bien.embeddable.Adresse;
import lombok.Data;

@Data
@Entity
@Table(name = "ti_mandator")
public class Mandator implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -538189913379812335L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "mandator_id", updatable = false, nullable = false)
	private Long id;

	/**
	 * FR: Adresse du lot.
	 *
	 */
	@Embedded
	@AttributeOverrides({ @AttributeOverride(name = "rue", column = @Column(name = "mandator_street")),
			@AttributeOverride(name = "rue2", column = @Column(name = "mandator_street2")),
			@AttributeOverride(name = "codePostal", column = @Column(name = "mandator_postalcode")),
			@AttributeOverride(name = "ville", column = @Column(name = "mandator_city")) })
	private Adresse adresse = null;

	@Column(name = "mandator_email")
	private String email;

	@Column(name = "mandator_mobile_phone_number")
	private String mobilePhoneNumber;

	@Column(name = "mandator_name")
	private String name;

	@Column(name = "mandator_office_phone_number")
	private String officePhoneNumber;
	
	@Column(name = "mandator_phone_number")
	private String phoneNumber;

}
