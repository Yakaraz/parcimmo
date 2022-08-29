package fr.immo.parc.repositories.model.bien.embeddable;

import javax.persistence.Embeddable;

import lombok.Data;

@Embeddable
@Data
public class Adresse {

    private String rue;

    private String rue2;

    private String codePostal;

    private String ville;
}
