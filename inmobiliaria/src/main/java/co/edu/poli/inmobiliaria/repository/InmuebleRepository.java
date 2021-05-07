package co.edu.poli.inmobiliaria.repository;

import java.util.LinkedList;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.ResponseBody;

import co.edu.poli.inmobiliaria.entitys.InmuebleEntity;
import co.edu.poli.inmobiliaria.model.ComisionModel;

public interface InmuebleRepository extends JpaRepository<InmuebleEntity, Long> {
	
	@Query("Select p from InmuebleEntity p where nombres LIKE ?1")
	LinkedList<InmuebleEntity> findByName(String name);
	
	@Query("Select p from InmuebleEntity p where idpersona = ?1 ")
	LinkedList<InmuebleEntity> findByPersona(Long idpersona);
	
	@Query("Select p from InmuebleEntity p where estado = 'EN VENTA'")
	LinkedList<InmuebleEntity> findActivos();
	
	@Query("Select p from InmuebleEntity p where tipo = ?1 and estado = 'EN VENTA'")
	LinkedList<InmuebleEntity> findByTipo(String tipo);
	

	@Query("SELECT titulo,descripcion,cast(fechaCreacion as date) AS fecha ,FLOOR((precio *30)/100) AS comision FROM InmuebleEntity WHERE MONTH(fechaCreacion) between ?1 and ?2")
	LinkedList<?> comision(Integer mes1, Integer mes2);

}