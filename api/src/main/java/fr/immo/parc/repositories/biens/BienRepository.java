package fr.immo.parc.repositories.biens;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import fr.immo.parc.repositories.model.property.Bien;

public interface BienRepository extends CrudRepository<Bien, Long>, JpaSpecificationExecutor<Bien> {

}
