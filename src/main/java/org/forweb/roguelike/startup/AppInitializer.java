package org.forweb.roguelike.startup;

import org.forweb.roguelike.startup.SpringConfiguration;
import org.springframework.orm.hibernate4.support.OpenSessionInViewFilter;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;

public class AppInitializer implements WebApplicationInitializer {


    public static final String BASE_PACKAGE = "org.forweb.roguelike";
    public static final String SESSION_FACTORY = "sessionFactory";
    public static final String ENTITY_MANAGER_FACTORY_BEAN = "entityManagerFactory";

    @Override
    public void onStartup(ServletContext container) {
        System.out.println("on startup");

        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
        rootContext.register(SpringConfiguration.class);

        container.addListener(new ContextLoaderListener(rootContext));

        addServlet(new DispatcherServlet(rootContext), "dispatcher", "/server/*", container);

        /*container.addFilter("openSessionInViewFilter", openSessionInViewFilter())
                .addMappingForUrlPatterns(null, false, "/*");
        container.addFilter("openEntityManagerInViewFilter", openEntityManagerInViewFilter())
                .addMappingForUrlPatterns(null, false, "/*");
        container.addFilter("authorizationFilter", new AuthorizationFilter())
                .addMappingForUrlPatterns(null, false, "/*");
        container.addFilter("encodingFilter", getCharacterEncodingFilter())
                .addMappingForUrlPatterns(null, false, "/*");*/
    }

    private CharacterEncodingFilter getCharacterEncodingFilter() {
        CharacterEncodingFilter out = new CharacterEncodingFilter();
        out.setEncoding("UTF-8");
        out.setForceEncoding(false);
        return out;
    }

    private void addServlet(Servlet servlet, String servletName, String mapping, ServletContext container) {
        ServletRegistration.Dynamic dynamic = container.addServlet(servletName, servlet);
        dynamic.setLoadOnStartup(1);
        dynamic.addMapping(mapping);
    }

    private OpenSessionInViewFilter openSessionInViewFilter() {
        OpenSessionInViewFilter filter = new OpenSessionInViewFilter();
        filter.setSessionFactoryBeanName(SESSION_FACTORY);
        return filter;
    }

    private OpenEntityManagerInViewFilter openEntityManagerInViewFilter() {
        OpenEntityManagerInViewFilter out = new OpenEntityManagerInViewFilter();
        out.setEntityManagerFactoryBeanName(ENTITY_MANAGER_FACTORY_BEAN);
        return out;
    }

}
