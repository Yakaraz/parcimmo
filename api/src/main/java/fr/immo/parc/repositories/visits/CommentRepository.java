package fr.immo.parc.repositories.visits;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.immo.parc.repositories.model.visit.Comment;

public interface CommentRepository extends CrudRepository<Comment, Long>, JpaSpecificationExecutor<Comment> {

}
