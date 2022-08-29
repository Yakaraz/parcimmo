package fr.immo.parc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.immo.parc.repositories.dictionnaires.Progress;

public interface ProgressDictionaryRepository extends JpaRepository<Progress, String> {

}
