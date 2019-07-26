package com.sick.sm.core.controller.dto.common;

public class ConsumerDTO {
	
	private String id;
	private String name;
    private AddressDTO address;
    
    public ConsumerDTO(String id, String name, AddressDTO address) {
		super();
		this.id = id;
		this.name = name;
		this.address = address;
	}
	public ConsumerDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public AddressDTO getAddress() {
		return address;
	}
	public void setAddress(AddressDTO address) {
		this.address = address;
	}
	
	@Override
	public String toString() {
		return "Consumer [id=" + id + ", name=" + name + ", address=" + address
				+ "]";
	}
}
