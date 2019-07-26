package com.sick.sm.core.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.sick.ap.services.settings.dto.ResponseDTO;
import com.sick.sm.core.constants.SmaConstant;
import com.sick.sm.core.constants.SmaEndPointConstant;
import com.sick.sm.core.controller.dto.common.CreateBookingDTO;

/**
 * The Class DataSourceConfigurationController.
 */
@RestController
@Api(value = SmaConstant.BOOKING)
@RequestMapping(value = SmaEndPointConstant.SBS_ENDPOINT)
public class BookingController {

	/**
	 * Create data source configuration.
	 *
	 * @param authorization
	 *            the authorization
	 * @param dataSourceConfig
	 *            the data source configuration
	 * @return the response entity
	 * @throws InvalidRequestException
	 *             the invalid request exception
	 */
	@ApiOperation(value = SmaConstant.CREATE_NEW_REQUEST)
	@RequestMapping(value = "/datasource", method = RequestMethod.POST)
	public ResponseEntity<ResponseDTO> dataSourceConfiguration(
			@RequestHeader(value = "Authorization") String authorization,
			@RequestBody CreateBookingDTO createBooking){

		ResponseDTO response = new ResponseDTO();
		response.setCode(SmaConstant.CREATED);
		response.setMessage(SmaConstant.NEW_BOOKING_CREATED);

		return new ResponseEntity<ResponseDTO>(response, HttpStatus.CREATED);

	}

}
