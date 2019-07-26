package com.sick.sm.core;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * The Class SafetyMachineSwaggerConfig.
 */
@EnableSwagger2
@Configuration
public class SafetyMachineSwaggerConfig { 
	
	/** The Constant LICENSE_TEXT. */
	public static final String LICENSE_TEXT = "License terms";
	
	/** The Constant TITLE. */
	public static final String TITLE = "Safety-Machine Analytics Application";
	
	/** The Constant DESCRIPTION. */
	public static final String DESCRIPTION ="Safety-Machine Analytics Application Api";
	
	/** The Constant SWAGGER_API_VERSION. */
	public static final String SWAGGER_API_VERSION = "1.0";
	
	/**
	 * Api info.
	 *
	 * @return the api info
	 */
	private ApiInfo apiInfo() {
		return new ApiInfoBuilder().title(TITLE).description(DESCRIPTION).license(LICENSE_TEXT)
				.version(SWAGGER_API_VERSION).build();
	}
	
	/**
	 * Enterprise api.
	 *
	 * @return the docket
	 */
	@Bean
	public Docket enterpriseApi() {
		
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).groupName("Safety Machine Analytics").select()
				.apis(RequestHandlerSelectors.basePackage("com.sick.sm.core.controller")).build();
	}
	
	


}
