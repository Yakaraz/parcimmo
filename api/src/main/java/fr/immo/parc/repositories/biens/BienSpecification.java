package fr.immo.parc.repositories.biens;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import fr.immo.parc.repositories.model.property.Bien;
import fr.immo.parc.repositories.search.SearchCriteria;
import fr.immo.parc.repositories.search.SearchOperation;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BienSpecification implements Specification<Bien> {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5776116272992730142L;
	private List<SearchCriteria> list;

	public BienSpecification() {
		this.list = new ArrayList<>();
	}

	public void add(SearchCriteria criteria) {
		list.add(criteria);
	}

	public <Y> Path<Y> getEmbeddableKey(Root<Bien> root, SearchCriteria criteria) {
		if (criteria.getEmbeddableKey() == null) {
			return root.get(criteria.getKey());
		} else {
			return root.get(criteria.getEmbeddableKey()).get(criteria.getKey());
		}

	}

	@Override
	public Predicate toPredicate(Root<Bien> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		// create a new predicate list
		List<Predicate> predicates = new ArrayList<>();

		// add add criteria to predicates
		for (SearchCriteria criteria : list) {
			if (criteria.getOperation().equals(SearchOperation.GREATER_THAN)) {
				predicates.add(builder.greaterThan(getEmbeddableKey(root, criteria), criteria.getValue().toString()));
			} else if (criteria.getOperation().equals(SearchOperation.LESS_THAN)) {
				predicates.add(builder.lessThan(getEmbeddableKey(root, criteria), criteria.getValue().toString()));
			} else if (criteria.getOperation().equals(SearchOperation.GREATER_THAN_EQUAL)) {
				predicates.add(
						builder.greaterThanOrEqualTo(getEmbeddableKey(root, criteria), criteria.getValue().toString()));
			} else if (criteria.getOperation().equals(SearchOperation.LESS_THAN_EQUAL)) {
				predicates.add(
						builder.lessThanOrEqualTo(getEmbeddableKey(root, criteria), criteria.getValue().toString()));
			} else if (criteria.getOperation().equals(SearchOperation.NOT_EQUAL)) {
				predicates.add(builder.notEqual(getEmbeddableKey(root, criteria), criteria.getValue()));
			} else if (criteria.getOperation().equals(SearchOperation.EQUAL)) {
				predicates.add(builder.equal(getEmbeddableKey(root, criteria), criteria.getValue()));
			} else if (criteria.getOperation().equals(SearchOperation.MATCH)) {
				predicates.add(builder.like(builder.lower(getEmbeddableKey(root, criteria)),
						"%" + criteria.getValue().toString().toLowerCase() + "%"));
			} else if (criteria.getOperation().equals(SearchOperation.MATCH_END)) {
				predicates.add(builder.like(builder.lower(getEmbeddableKey(root, criteria)),
						criteria.getValue().toString().toLowerCase() + "%"));
			} else if (criteria.getOperation().equals(SearchOperation.MATCH_START)) {
				predicates.add(builder.like(builder.lower(getEmbeddableKey(root, criteria)),
						"%" + criteria.getValue().toString().toLowerCase()));
			} else if (criteria.getOperation().equals(SearchOperation.IN)) {
				predicates.add(builder.in(getEmbeddableKey(root, criteria)).value(criteria.getValue()));
			} else if (criteria.getOperation().equals(SearchOperation.NOT_IN)) {
				predicates.add(builder.not(getEmbeddableKey(root, criteria)).in(criteria.getValue()));
			}
		}

		return builder.and(predicates.toArray(new Predicate[0]));
	}

}
