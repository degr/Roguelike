package org.forweb.roguelike.startup;

import org.apache.commons.dbcp.BasicDataSource;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.engine.jdbc.connections.internal.DatasourceConnectionProviderImpl;
import org.hibernate.engine.jdbc.connections.spi.ConnectionProvider;
import org.hibernate.service.ServiceRegistry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

/**
 * Created by rsmirnou on 9/21/2015. 02
 */
@Configuration
@EnableJpaRepositories(AppInitializer.BASE_PACKAGE + ".dao")
public class DbConfiguration {

    public static final String PACKAGE_ENTITY = AppInitializer.BASE_PACKAGE + ".entity";
    private static final boolean AUTOCOMMIT = true;

    @Value("${jdbc.driver.name}")
    private String driverClassName;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    @Value("${hibernate.connection.charset}")
    String hibernateConnectionCharset;

    @Value("${hibernate.dialect}")
    String hibernateDialect;

    @Value("${hibernate.ejb.naming_strategy}")
    String hibernateEjbNamingStrategy;

    @Value("${hibernate.hbm2ddl.auto}")
    String hibernateHbm2ddlAuto;

    @Value("${hibernate.generate_statistics}")
    String hibernateGenerateStatistics;


    /*@Value("${hibernate.cache.region.factory_class}")
    String hibernateCacheRegionFactory_class;

    @Value("${hibernate.cache.use_second_level_cache}")
    String hibernateCacheUse_second_level_cache;

    @Value("${hibernate.cache.use_query_cache}")
    String hibernateCacheUse_query_cache;*/

    @Value("${hibernate.show_sql}")
    Boolean hibernateShowSql;

    @Value("${hibernate.format_sql}")
    Boolean hibernateFormatSql;

    @Value("${hibernate.use_sql_comments}")
    Boolean hibernateUseSqlComments;

    @Value("${hibernate.jdbc.batch_size}")
    String hibernateJdbcBatchSize;

    @Value("${hibernate.cache.region_prefix}")
    String hibernateCacheRegionPrefix;

    @Bean(name = "hibernateProperties")
    public Properties hibernateProperties() {
        Properties properties = new Properties();

        properties.put("hibernate.connection.url", url);
        properties.put("hibernate.connection.username", username);
        properties.put("hibernate.connection.password", password);
        properties.put("hibernate.connection.driver_class", driverClassName);
        properties.put("hibernate.connection.pool_size", 20);
        //properties.put("shutdown", true);
        properties.put("hsqldb.write_delay_millis", 0);
        properties.put("hibernate.c3p0.idle_test_period", 300);
        properties.put("hibernate.c3p0.timeout", 120);


        properties.put("hibernate.connection.charSet", hibernateConnectionCharset);
        properties.put("hibernate.connection.autocommit", AUTOCOMMIT);

        properties.put("hibernate.dialect", hibernateDialect);
        properties.put("hibernate.ejb.naming_strategy", hibernateEjbNamingStrategy);
        properties.put("hibernate.hbm2ddl.auto", hibernateHbm2ddlAuto);
        properties.put("hibernate.generate_statistics", hibernateGenerateStatistics);

        //properties.put("hibernate.cache.region.factory_class", org.hibernate.cache.ehcache.SingletonEhCacheRegionFactory);
        //properties.put("#hibernate.cache.use_second_level_cache", "true");
        //properties.put("#hibernate.cache.use_query_cache", "true");

        properties.put("hibernate.show_sql", hibernateShowSql);
        properties.put("format_sql", hibernateFormatSql);
        properties.put("hibernate.use_sql_comments", hibernateUseSqlComments);
        properties.put("use_sql_comments", hibernateUseSqlComments);

        properties.put("hibernate.jdbc.batch_size", hibernateJdbcBatchSize);
        properties.put("hibernate.order_inserts", true);
        properties.put("hibernate.order_updates", true);
        properties.put("hibernate.cache.region_prefix", hibernateCacheRegionPrefix);
        // properties.put("hibernate.current_session_context_class", "thread");
        return properties;
    }


    @Bean(name = "dataSource")
    public DataSource dataSource() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        // dataSource.setDefaultAutoCommit(AUTOCOMMIT);
        return dataSource;
    }

    @Bean(name = AppInitializer.SESSION_FACTORY)
    public SessionFactory sessionFactory(org.hibernate.cfg.Configuration configuration, ServiceRegistry serviceRegistry) {
        return configuration.buildSessionFactory(serviceRegistry);
    }

    @Bean
    org.hibernate.cfg.Configuration configuration(Properties hibernateProperties) {
        org.hibernate.cfg.Configuration configuration = new org.hibernate.cfg.Configuration();
        configuration.addPackage("entity");
        configuration.setProperties(hibernateProperties);
        return configuration;
    }

    @Bean(name = "serviceRegistry")
    public ServiceRegistry serviceRegistry(org.hibernate.cfg.Configuration configuration) {
        return new StandardServiceRegistryBuilder().applySettings(
                configuration.getProperties()).build();
    }

    /////////////////////////////////////////////////////////////////////
    @Bean(name = "entityManager")
    public EntityManager entityManager(EntityManagerFactory entityManagerFactory) {
        return entityManagerFactory.createEntityManager();
    }

    @Bean(name = "transactionManager")
    public JpaTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        JpaTransactionManager out = new JpaTransactionManager();
        out.setEntityManagerFactory(entityManagerFactory);
        return out;
    }

    @Bean(name = AppInitializer.ENTITY_MANAGER_FACTORY_BEAN)
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(Properties hibernateProperties, DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setPersistenceUnitName("persistenceUnit");
        //em.setDataSource(dataSource);
        em.setJpaProperties(hibernateProperties);
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        em.setPackagesToScan(PACKAGE_ENTITY);
        return em;
    }

    @Bean(name = "connectionProvider")
    ConnectionProvider connectionProvider(DataSource dataSource) {
        DatasourceConnectionProviderImpl out = new DatasourceConnectionProviderImpl();
        out.setDataSource(dataSource);
        return out;
    }
}