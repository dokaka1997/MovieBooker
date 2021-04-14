package com.example.demo.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class OrderTicketRequest {
    private String customerName;
    private Date orderDate;

}
