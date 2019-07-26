package com.sick.sm.core.controller.dto.common;

import java.sql.Timestamp;

public class CreateBookingDTO {

	private String sid;
	private Timestamp date;
	private ConsumerDTO consumer;
	private String totalAmount;
	private String due;
	private String paid;

	public CreateBookingDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreateBookingDTO(String sid, Timestamp date, ConsumerDTO consumer,
			String totalAmount, String due, String paid) {
		super();
		this.sid = sid;
		this.date = date;
		this.consumer = consumer;
		this.totalAmount = totalAmount;
		this.due = due;
		this.paid = paid;
	}

	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public ConsumerDTO getConsumer() {
		return consumer;
	}

	public void setConsumer(ConsumerDTO consumer) {
		this.consumer = consumer;
	}

	public String getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getDue() {
		return due;
	}

	public void setDue(String due) {
		this.due = due;
	}

	public String getPaid() {
		return paid;
	}

	public void setPaid(String paid) {
		this.paid = paid;
	}

	@Override
	public String toString() {
		return "CreateBooking [sid=" + sid + ", date=" + date + ", consumer="
				+ consumer + ", totalAmount=" + totalAmount + ", due=" + due
				+ ", paid=" + paid + "]";
	}

}
