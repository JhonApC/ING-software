package co.edu.poli.inmobiliaria.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.poli.inmobiliaria.entitys.FotoInmuebleEntity;
import co.edu.poli.inmobiliaria.repository.CrudGenerico;
import co.edu.poli.inmobiliaria.repository.FotoInmuebleRepository;

@Service
public class FotoInmuebleService implements CrudGenerico<FotoInmuebleEntity> {
	@Autowired
	private FotoInmuebleRepository repository;

	@Override
	public List<FotoInmuebleEntity> findAll() {
		return this.repository.findAll();
	}

	@Override
	public FotoInmuebleEntity save(FotoInmuebleEntity entity) {
		return this.repository.save(entity);
	}

	@Override
	public FotoInmuebleEntity update(FotoInmuebleEntity entity) {
		return this.repository.save(entity);
	}

	@Override
	public FotoInmuebleEntity findById(Long id) {
		return this.repository.findById(id).get();
	}

	@Override
	public FotoInmuebleEntity delete(Long id) {
		FotoInmuebleEntity entity =this.repository.findById(id).get();
		this.repository.deleteById(id);
		return entity;
	}
	

	
}
