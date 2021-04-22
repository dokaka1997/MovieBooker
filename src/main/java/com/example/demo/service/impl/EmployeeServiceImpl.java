package com.example.demo.service.impl;

import com.example.demo.model.entity.TicketEntity;
import com.example.demo.model.response.TicketResponse;
import com.example.demo.repository.TicketRepository;
import com.example.demo.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private TicketRepository ticketRepository;

    @Override
    public TicketResponse findTicketById(Long id) {
        TicketEntity ticketEntity = ticketRepository.getOne(id);
        return ticketResponse(ticketEntity);
    }

    @Override
    public Boolean checkPayment(Long id) {
        return ticketRepository.getOne(id).isPayment();
    }

    @Override
    public TicketResponse paymentTicket(Long id) {
        TicketEntity ticketEntity = ticketRepository.getOne(id);
        ticketEntity.setPayment(true);
        ticketRepository.save(ticketEntity);
        return ticketResponse(ticketEntity);
    }

    private TicketResponse ticketResponse(TicketEntity ticketEntity) {
        TicketResponse ticketResponse = new TicketResponse();
        ticketResponse.setPayment(ticketEntity.isPayment());
        ticketResponse.setFilm(ticketEntity.getFilm().getName());
        ticketResponse.setRoom(ticketEntity.getRoom().getName());
        ticketResponse.setSeatsNumber(ticketEntity.getNumberSeats());
        ticketResponse.setCustomerName(ticketEntity.getUser().getName());
        ticketResponse.setPrice(Integer.valueOf(ticketEntity.getPrice()));
        ticketResponse.setOrderDate(ticketEntity.getDate());
        return ticketResponse;
    }
}
