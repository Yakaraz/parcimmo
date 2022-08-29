package fr.immo.parc.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.immo.parc.repositories.dictionnaires.AnswerState;

public interface AnswerStateDictionaryRepository extends JpaRepository<AnswerState, String> {

}
