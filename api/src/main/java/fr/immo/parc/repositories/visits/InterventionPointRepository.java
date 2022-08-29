package fr.immo.parc.repositories.visits;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.immo.parc.repositories.model.visit.InterventionPoint;

public interface InterventionPointRepository
		extends CrudRepository<InterventionPoint, Long>, JpaSpecificationExecutor<InterventionPoint> {
	@Override
	Collection<InterventionPoint> findAll();
}
