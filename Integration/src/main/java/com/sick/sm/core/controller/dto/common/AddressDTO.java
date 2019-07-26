package com.sick.sm.core.controller.dto.common;

/**
 * The Class AddressDTO.
 */
public class AddressDTO {

	/** The house no. */
	private String houseNo;
	
	/** The street. */
	private String street;
	
	/** The locality. */
	private String locality;
	
	/** The land mark. */
	private String landMark;
	
	/** The pincode. */
	private String pincode;
	
	/** The description. */
	private String description;
	
	private String mobile;

	/**
	 * Instantiates a new address DTO.
	 */
	public AddressDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * Instantiates a new address DTO.
	 *
	 * @param houseNo the house no
	 * @param street the street
	 * @param locality the locality
	 * @param landMark the land mark
	 * @param pincode the pincode
	 */
	public AddressDTO(String houseNo, String street, String locality,
			String landMark, String pincode,String mobile) {
		super();
		this.houseNo = houseNo;
		this.street = street;
		this.locality = locality;
		this.landMark = landMark;
		this.pincode = pincode;
		this.mobile = mobile;
	}

	/**
	 * Gets the house no.
	 *
	 * @return the house no
	 */
	public String getHouseNo() {
		return houseNo;
	}

	/**
	 * Sets the house no.
	 *
	 * @param houseNo the new house no
	 */
	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}

	/**
	 * Gets the street.
	 *
	 * @return the street
	 */
	public String getStreet() {
		return street;
	}

	/**
	 * Sets the street.
	 *
	 * @param street the new street
	 */
	public void setStreet(String street) {
		this.street = street;
	}

	/**
	 * Gets the locality.
	 *
	 * @return the locality
	 */
	public String getLocality() {
		return locality;
	}

	/**
	 * Sets the locality.
	 *
	 * @param locality the new locality
	 */
	public void setLocality(String locality) {
		this.locality = locality;
	}

	/**
	 * Gets the land mark.
	 *
	 * @return the land mark
	 */
	public String getLandMark() {
		return landMark;
	}

	/**
	 * Sets the land mark.
	 *
	 * @param landMark the new land mark
	 */
	public void setLandMark(String landMark) {
		this.landMark = landMark;
	}

	/**
	 * Gets the pincode.
	 *
	 * @return the pincode
	 */
	public String getPincode() {
		return pincode;
	}

	/**
	 * Sets the pincode.
	 *
	 * @param pincode the new pincode
	 */
	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	/**
	 * Gets the description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Sets the description.
	 *
	 * @param description the new description
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	
	

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "AddressDTO [houseNo=" + houseNo + ", street=" + street
				+ ", locality=" + locality + ", landMark=" + landMark
				+ ", pincode=" + pincode + ", description=" + description + "]";
	}

}
