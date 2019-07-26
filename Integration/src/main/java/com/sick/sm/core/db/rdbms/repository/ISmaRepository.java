package com.sick.sm.core.db.rdbms.repository;

import java.io.Serializable;
import java.util.List;
import java.util.Set;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * The Interface ISmaRepository.
 *
 * @param <T> the generic type
 * @param <ID> the generic type
 */
@NoRepositoryBean
public interface ISmaRepository<T,ID extends Serializable> extends CrudRepository<T, ID>{
	
		
	/**
	 * Find by id in.
	 *
	 * @param idList the id list
	 * @return the sets the
	 */
	public Set<T> findByIdIn(List<Long> idList);

}
