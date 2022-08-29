package fr.immo.parc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.immo.parc.repositories.dictionnaires.AnswerYesNo;

public interface AnswerYesNoDictionaryRepository extends JpaRepository<AnswerYesNo, String> {

}
