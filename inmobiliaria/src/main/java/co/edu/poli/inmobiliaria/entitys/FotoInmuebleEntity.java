package co.edu.poli.inmobiliaria.entitys;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Entity
@Table(name="fotoinmueble")
public class FotoInmuebleEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	@Column(columnDefinition="TIMESTAMP default CURRENT_TIMESTAMP")
	private String fecha;	
	@Column(columnDefinition="longtext")
	private String imagen;
	@OneToOne(mappedBy = "foto")
	@JsonIgnore
	private InmuebleEntity inmueble;
}
