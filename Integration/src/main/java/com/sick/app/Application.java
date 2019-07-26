package com.sick.app;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * The Class Application.
 */
@SpringBootApplication

@ComponentScan(basePackages = {
        "com.sick.app",
        "com.sick.ap.services.configuration",
        "com.sick.ap.services.i18nl10n",
        "com.sick.ap.services.loginmodule",
        "com.sick.ap.services.filemanager",
        "com.sick.ap.services.license",
        "com.sick.ap.services.encryption",
        "com.sick.ap.services.decryption",

        "com.sick.ap.commons.util",
        "com.sick.sm",
        "com.sick.ap.dataacquisitionandcontrol.api.parser",
        //dacq thread
        "com.sick.ap.dacq.core",
        //web socket server handler
        "com.sick.ap.dataacquisitionandcontrol.api.wsserver.handler",
        //web socket server config
        "com.sick.ap.dataacquisitionandcontrol.api.wsserver",
        //dacq starter
        "com.sick.ap.dataacquisitionandcontrol.api.core.starter",
        "com.sick.ap.services.settings",
        "com.sick.sma.repository",
        "com.sick.sma"

})


@PropertySource({
        "file:./config/application.properties",
        "file:./config/loginModuleConfig.properties",
        "file:./config/mysqldb.properties",
        "file:./config/product_logback_config.properties",
        "file:./config/profiles/${spring.profiles.active}/application-${spring.profiles.active}.properties",
        "file:./config/profiles/${spring.profiles.active}/db_config-${spring.profiles.active}.properties",
        "file:./config/profiles/${spring.profiles.active}/templateApp_db_config-${spring.profiles.active}.properties",
        "file:./config/application-messages.properties",
        "file:./config/product_code.properties",
        "file:./config/dataacquisitionandcontrol.properties",
})

@EnableAutoConfiguration
@EnableCaching
@EnableScheduling
public class Application{
 
  /** The Constant LOG. */
  public static final Logger LOG = LoggerFactory.getLogger(Application.class);

  /** The context. */
  private static ConfigurableApplicationContext context;

  private static final String STARTING_APPLICATION_LOG_MESSAGE = "~~~~~~~~~~~~~~~~~~~~~~~ Starting SMA Application ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
  private static final String APPLICATION_STARTUP_LOG_MESSAGE = "~~~~~~~~~~~~~~~~~~~ SMA Application is Running  5080~~~~~~~~~~~~~~~~~~~~~~~~~";
  private static final String APPLICATION_STARTUP_ERRROR_LOG_MESSAGE = "-x-x-x-x-x-x-x-x-x-x-x-x- Application FAILED to startup and ecountered Errors. Contact SICK with logs for technical support -x-x-x-x-x-x-x-x-x-x-x-x-";


    /**
   * The main method.
   *
   * @param args the arguments
   */

  public static void main(String[] args) {
    //setContext(SpringApplication.run(Application.class, args));

      try {

          SpringApplication app = new SpringApplication(Application.class);
          System.setProperty("spring.devtools.restart.enabled", "false");
          app.setBannerMode(Banner.Mode.OFF); // Disable banner
          app.run(args);
          logStartupMessage(APPLICATION_STARTUP_LOG_MESSAGE, null);
      } catch (Exception e) {
          logStartupMessage(APPLICATION_STARTUP_ERRROR_LOG_MESSAGE+"{}", e);
      }

    logStartupMessage(STARTING_APPLICATION_LOG_MESSAGE, null);
    
    System.setProperty("server.servlet.context-path", "/baeldung");
    
    }

    private static void logStartupMessage(String message, Exception e){
        System.out.println(message); // NOSONAR: intentional.
        if( e == null){
            LOG.info(message);
        }else{
            LOG.error(message, e);
        }
    }

  /**
   * Gets the context.
   *
   * @return the context
   */
  public static final ConfigurableApplicationContext getContext() {

    return context;
  }

  /**
   * Sets the context.
   *
   * @param context the new context
   */
  private static void setContext(ConfigurableApplicationContext context) {
    Application.context = context;
  }
  


}
