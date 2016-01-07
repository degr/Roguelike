package org.forweb.roguelike.startup;

import com.google.gson.ExclusionStrategy;
import com.google.gson.GsonBuilder;
import org.forweb.roguelike.utils.DateConverter;
import org.forweb.roguelike.utils.JsonExclusionStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.GsonHttpMessageConverter;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.annotation.PostConstruct;
import java.util.Date;
import java.util.List;

/**
 * Created by rsmirnou on 7/17/2015. 20
 */
@Configuration
@ComponentScan(basePackages = {
        "org.forweb.roguelike.startup",
        "org.forweb.roguelike.controller",
        "org.forweb.roguelike.dao",
        "org.forweb.roguelike.service",
        "org.forweb.roguelike.entity"
})
@PropertySource(value = {
        "classpath:META-INF/config.properties",
        "classpath:META-INF/database.properties",
})
@EnableScheduling
@EnableWebMvc
public class SpringConfiguration extends WebMvcConfigurerAdapter {

    @Autowired
    ApplicationContext applicationContext;

    /**
     * Any logic for spring servlet instantiation can be placed there
     */
    @PostConstruct
    public void postConstruct() {
        System.out.println("app post construct");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(pageableHandlerMethodArgumentResolver());
        super.addArgumentResolvers(argumentResolvers);
    }

    /**
     * As default spring have some message converters.
     * If you override WebMvcConfigurerAdapter#configureMessageConverters, all default converters ignored.
     *
     * @param converters list of message convertors
     * @see org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport #getMessageConverters()
     */
    @Override
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
        for (int i = 0; i < converters.size(); i++) {
            HttpMessageConverter conv = converters.get(i);
            if (conv.getClass().equals(GsonHttpMessageConverter.class)) {
                converters.set(i, gsonHttpMessageConverter());
            }
        }
    }


    @Bean(name = "pageableHandlerMethodArgumentResolver")
    public PageableHandlerMethodArgumentResolver pageableHandlerMethodArgumentResolver() {
        PageableHandlerMethodArgumentResolver out = new PageableHandlerMethodArgumentResolver();
        Pageable fallback = new PageRequest(0, 20);
        out.setFallbackPageable(fallback);
        return out;
    }

    /**
     * This bean is required for @Value("${my.value.from.properties}") annotation
     *
     * @return PropertySourcesPlaceholderConfigurer
     */
    @Bean(name = "propertySourcesPlaceholderConfigurer")
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Bean(name = "gsonBuilder")
    public GsonBuilder gsonBuilder() {
        ExclusionStrategy strategy = new JsonExclusionStrategy();
        return new GsonBuilder()
                .enableComplexMapKeySerialization()
                .addSerializationExclusionStrategy(strategy)
                .addDeserializationExclusionStrategy(strategy)
                .registerTypeAdapter(Date.class, new DateConverter.Serializer());
    }


    @Bean(name = "gsonHttpMessageConverter")
    public GsonHttpMessageConverter gsonHttpMessageConverter() {
        GsonHttpMessageConverter converter = new GsonHttpMessageConverter();
        converter.setGson(gsonBuilder().create());
        return converter;
    }

    @Bean(name = "validator")
    public LocalValidatorFactoryBean validator() {
        LocalValidatorFactoryBean out = new LocalValidatorFactoryBean();
        out.setValidationMessageSource(messageSource());
        return out;
    }


    @Bean(name = "messageSource")
    public ResourceBundleMessageSource messageSource() {
        ResourceBundleMessageSource out = new ResourceBundleMessageSource();
        out.setBasenames("validation/custom", "validation/common");
        return out;
    }

    @Bean(name = "messageAccessor")
    public MessageSourceAccessor messageAccessor() {
        return new MessageSourceAccessor(messageSource());
    }

    @Bean(name = "multipartResolver")
    public MultipartResolver multipartResolver() {
        return new CommonsMultipartResolver();
    }
}