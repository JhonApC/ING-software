package co.edu.poli.inmobiliaria.controllers;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.poli.inmobiliaria.entitys.InmuebleEntity;
import co.edu.poli.inmobiliaria.model.ComisionModel;
import co.edu.poli.inmobiliaria.services.FotoInmuebleService;
import co.edu.poli.inmobiliaria.services.InmuebleService;

@RestController
@CrossOrigin(origins = "http://localhost:5500")
@RequestMapping(value = "/api/inmueble")
public class InmuebleController {

	@Autowired
	private InmuebleService servicio;

	@Autowired
	private FotoInmuebleService fotoService;

	@GetMapping("/findAll")
	public List<InmuebleEntity> findAll() {
		return this.servicio.findAll();
	}

	@GetMapping("/findActivos")
	public List<InmuebleEntity> findActivos() {
		return this.servicio.findActivos();
	}

	@GetMapping("/findById")
	public InmuebleEntity findById(@RequestHeader Long id) {
		return this.servicio.findById(id);
	}

	@GetMapping("/findByTipo")
	public LinkedList<InmuebleEntity> findByTipo(@RequestHeader String tipo) {
		return this.servicio.findByTipo(tipo);
	}

	@GetMapping("/findByName")
	public LinkedList<InmuebleEntity> findByName(@RequestHeader String name) {
		return this.servicio.findByName(name);
	}

	@GetMapping("/findByPersona")
	public LinkedList<InmuebleEntity> findByPersona(@RequestHeader Long idpersona) {
		return this.servicio.findByPersona(idpersona);
	}

	@GetMapping("comision")
	public LinkedList<?> comision(@RequestHeader(defaultValue = "0") Integer mes1,@RequestHeader(defaultValue = "12") Integer mes2) {
		return this.servicio.comision(mes1,mes2);
	}

	@PostMapping("/save")
	public InmuebleEntity save(@RequestBody InmuebleEntity entity) {
		System.out.println(entity.getFoto().getImagen());
		return this.servicio.save(entity);
	}

	@PutMapping("/edit")
	public InmuebleEntity edit(@RequestBody InmuebleEntity entity) {
		return this.servicio.save(entity);
	}

	@DeleteMapping("/delete/{id}")
	public InmuebleEntity delete(@PathVariable("id") Long id) {
		InmuebleEntity entity = this.servicio.findById(id);
		this.servicio.delete(id);
		return entity;

	}
}
