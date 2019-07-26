package com.sick.sm.core;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import com.sick.ap.components.loginmodule.settings.configuration.ApLoginWebConfig;

/**
 * The Class WebConfiguration.
 */
@Configuration 
public class WebConfiguration extends ApLoginWebConfig {


  /*
   * (non-Javadoc)
   *  
   * @see
   * org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter#addViewControllers(
   * org.springframework.web.servlet.config.annotation.ViewControllerRegistry)
   * 
   */
  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/{spring:\\w+}").setViewName("forward:/");
    registry.addViewController("/**/{spring:\\b(?!token)\\w+}").setViewName("forward:/");
  }
} 

