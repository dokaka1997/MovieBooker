package com.example.demo.service;

import com.example.demo.model.entity.FilmEntity;
import com.example.demo.model.request.*;
import com.example.demo.model.response.ListFilmResponse;
import com.example.demo.model.response.SeatBookingResponse;
import com.example.demo.model.response.TicketResponse;
import com.example.demo.model.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest userRequest);

    List<ListFilmResponse> getListFilm();

    FilmEntity geFilmById(Long id);

    UserResponse updateUser(UpdateUserRequest updateUserRequest);

    TicketResponse order(OrderTicketRequest orderTicketRequest);

    BookingResponse bookingFilm(Long idFilm);

    SeatBookingResponse seatBookingResponse(SeatsBookingRequest seatsBookingRequest);

}
