package com.sick.sm.core.db.rdbms.configuration;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.DatabasePopulator;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

/**
 * The Class SmaLoginDataConfiguration.
 */
@Configuration
public class SmaLoginDataConfiguration {
  
  /** The login datasource. */
  @Autowired
  @Qualifier("loginModuleComponentDataSource")
  private DataSource loginDatasource;

  /** The env. */
  @Autowired
  private Environment env;

  /**
   * Inits the login data.
   */
  @PostConstruct
  private void initLoginData() {
  Resource logininitData = new ClassPathResource(env.getProperty("sma.login.db.data"));

    DatabasePopulator loginDatabasePopulator = new ResourceDatabasePopulator(logininitData);
    DatabasePopulatorUtils.execute(loginDatabasePopulator, loginDatasource);

  }
}
