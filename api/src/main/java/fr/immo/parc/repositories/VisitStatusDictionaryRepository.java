package fr.immo.parc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.immo.parc.repositories.dictionnaires.VisitStatus;

public interface VisitStatusDictionaryRepository extends JpaRepository<VisitStatus, String> {

}
