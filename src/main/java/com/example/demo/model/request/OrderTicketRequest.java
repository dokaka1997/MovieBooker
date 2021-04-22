package com.example.demo.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderTicketRequest {
    private Long customerName;
    private Long orderDate;
    private Long film;
    private Long room;
    private String seatsNumber;
    private boolean payment = false;
}
