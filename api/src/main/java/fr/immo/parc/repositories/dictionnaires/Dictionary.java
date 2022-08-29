package fr.immo.parc.repositories.dictionnaires;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import lombok.Data;

@Data
@MappedSuperclass
public class Dictionary {

	@Id
	private String code;

	@Column
	private String value;

}