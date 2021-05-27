package co.edu.poli.inmobiliaria.example;

import co.edu.poli.inmobiliaria.repository.ILogger;

public class ConsoleLogger implements ILogger {

	@Override
	public void log(String msg) {
	System.out.println("CONSOLE "+msg);
	
	}

}
