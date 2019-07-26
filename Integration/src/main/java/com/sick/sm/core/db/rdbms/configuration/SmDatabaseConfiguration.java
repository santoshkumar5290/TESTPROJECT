package com.sick.sm.core.db.rdbms.configuration;


import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.init.DatabasePopulator;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import com.sick.ap.decryptor.rsa.RSADecryptor;


/**
 * The Class SmDatabaseConfiguration.
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "smaEntityManager",
    transactionManagerRef = "smaTransactionManager", basePackages = "com.sick.sm.core")
public class SmDatabaseConfiguration {

  /** The env. */
  @Autowired
  private Environment env;

  /**
   * Sma entity manager.
   *
   * @param builder the builder
   * @return the local container entity manager factory bean
   */
  @Bean(name = "smaEntityManager")
  @Primary
  public LocalContainerEntityManagerFactoryBean smaEntityManager(EntityManagerFactoryBuilder builder) {
    return builder.dataSource(smaDataSource()).packages("com.sick.sm.core")
        .persistenceUnit("SmaPU").build();
  }

  /**
   * Sma data source.
   *
   * @return the data source
   */
  @Primary
  @Bean
  public DataSource smaDataSource() {
    DriverManagerDataSource smaDataSource = new DriverManagerDataSource();
    smaDataSource.setDriverClassName(env.getProperty("sma.db.driver"));
    smaDataSource.setUrl(env.getProperty("sma.db.url"));
    smaDataSource.setUsername(env.getProperty("sma.db.username"));
    smaDataSource.setPassword((new RSADecryptor().rsaDecrypt(env.getProperty("sma.db.password"))));

    // schema initialization scripts
    Resource initSchema = new ClassPathResource(env.getProperty("sma.db.schema"));
    Resource initData = new ClassPathResource(env.getProperty("sma.db.data"));
    DatabasePopulator databasePopulator = new ResourceDatabasePopulator(initSchema,initData);
    DatabasePopulatorUtils.execute(databasePopulator, smaDataSource);

    return smaDataSource;
  }


  /**
   * Sma transaction manager.
   *
   * @param entityManagerFactory the entity manager factory
   * @return the platform transaction manager
   */
  @Bean(name = "smaTransactionManager")
  @Primary
  public PlatformTransactionManager smaTransactionManager(
      @Qualifier("smaEntityManager") EntityManagerFactory entityManagerFactory) {
    return new JpaTransactionManager(entityManagerFactory);
  }
}
