package fr.immo.parc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.immo.parc.repositories.dictionnaires.Rentable;

public interface RentableDictionaryRepository extends JpaRepository<Rentable, String> {

}
