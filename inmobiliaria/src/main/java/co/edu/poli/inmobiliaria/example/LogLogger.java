package co.edu.poli.inmobiliaria.example;

import java.util.logging.Logger;

import co.edu.poli.inmobiliaria.repository.ILogger;

public class LogLogger implements ILogger {

	@Override
	public void log(String msg) {
		Logger log = Logger.getLogger(LogLogger.class.getName());
		log.info("FILE "+msg);
	}

}
