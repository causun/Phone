package kj002.demo7;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Demo7Application {
	public static void main(String[] args) {
		SpringApplication.run(Demo7Application.class, args);
	}
}
