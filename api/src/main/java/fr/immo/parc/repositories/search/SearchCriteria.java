package fr.immo.parc.repositories.search;

import lombok.Data;

@Data
public class SearchCriteria {
	private String key;
	private String embeddableKey;
	private Object value;
	private SearchOperation operation;

	public SearchCriteria() {
	}

	public SearchCriteria(String key, Object value, SearchOperation operation) {
		this.key = key;
		this.value = value;
		this.operation = operation;
	}
	
	public SearchCriteria(String embeddableKey, String key, Object value, SearchOperation operation) {
		this.key = key;
		this.value = value;
		this.operation = operation;
		this.embeddableKey = embeddableKey;
	}
}