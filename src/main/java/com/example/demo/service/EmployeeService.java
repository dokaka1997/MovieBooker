package com.example.demo.service;

import com.example.demo.model.response.TicketResponse;

public interface EmployeeService {
    TicketResponse findTicketById(Long id);

    Boolean checkPayment(Long id);

    TicketResponse paymentTicket(Long id);
}
