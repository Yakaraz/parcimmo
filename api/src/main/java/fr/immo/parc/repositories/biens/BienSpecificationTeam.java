package fr.immo.parc.repositories.biens;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.CollectionUtils;

import fr.immo.parc.repositories.model.property.Bien;
import fr.immo.parc.repositories.model.user.Team;
import fr.immo.parc.repositories.search.SearchCriteria;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class BienSpecificationTeam implements Specification<Bien> {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5776116272992730142L;

	private List<String> teamCodeList;

	public BienSpecificationTeam() {
		this.teamCodeList = new ArrayList<>();
	}

	public BienSpecificationTeam(List<String> teamCodes) {
		this.teamCodeList = new ArrayList<String>(teamCodes);
	}

	public void add(String teamId) {
		teamCodeList.add(teamId);
	}

	@Override
	public Predicate toPredicate(Root<Bien> root, CriteriaQuery<?> query, CriteriaBuilder builder) {

		List<Predicate> predicates = new ArrayList<>();

		if (CollectionUtils.isEmpty(teamCodeList)) {
			return null;
		}

		Join<Bien, Team> teamBien = root.join("teams", JoinType.LEFT);

		for (String code : teamCodeList) {
			predicates.add(builder.equal(teamBien.get("code"), code));
		}

		return builder.or(predicates.toArray(new Predicate[0]));
	}

}
