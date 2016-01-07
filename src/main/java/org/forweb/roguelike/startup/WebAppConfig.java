package org.forweb.roguelike.startup;


import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
@ComponentScan(AppInitializer.BASE_PACKAGE)
public class WebAppConfig extends WebMvcConfigurerAdapter {

}

