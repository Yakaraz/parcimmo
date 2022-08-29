package fr.immo.parc.repositories.visits;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import fr.immo.parc.repositories.model.visit.Visit;

public interface VisitRepository extends CrudRepository<Visit, Long>, JpaSpecificationExecutor<Visit> {

	/**
	 * Retrieve all visit from a idLot
	 * @param idLot
	 * @return a visit collection
	 */
	@Query(value = "SELECT * FROM ti_visit v WHERE v.visit_property_id = :idLot", nativeQuery = true)
	Collection<Visit> findAllVisitByLotId(Long idLot);
}
