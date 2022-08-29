package fr.immo.parc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.immo.parc.repositories.dictionnaires.PropertyType;

public interface PropertyTypeDictionaryRepository extends JpaRepository<PropertyType, String> {

}
