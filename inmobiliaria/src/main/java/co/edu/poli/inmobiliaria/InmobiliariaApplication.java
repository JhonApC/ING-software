package co.edu.poli.inmobiliaria;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import co.edu.poli.inmobiliaria.example.ConsoleLogger;
import co.edu.poli.inmobiliaria.example.LogLogger;
import co.edu.poli.inmobiliaria.repository.ILogger;



@SpringBootApplication
public class InmobiliariaApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(InmobiliariaApplication.class, args);
	}
	public  ILogger test(int num) {
		System.out.println("ingreso");
		return (num > 0) ? new ConsoleLogger() : new LogLogger();

	}
	@Override
	public void run(String... args) throws Exception {
		InmobiliariaApplication f = new InmobiliariaApplication();
		ILogger log = f.test(0);
		log.log("ING");
		
	}
}
