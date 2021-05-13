package com.example.demo.service.impl;

import com.example.demo.exception.AccountExistedException;
import com.example.demo.model.entity.*;
import com.example.demo.model.request.*;
import com.example.demo.model.response.*;
import com.example.demo.repository.*;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    FilmRepository filmRepository;
    RoomRepository roomRepository;
    TicketRepository ticketRepository;
    LocationRepository locationRepository;
    ScheduleRepository scheduleRepository;

    @Override
    public UserResponse createUser(UserRequest userRequest) {

        if (!userRepository.findByUsername(userRequest.getUsername()).isEmpty()) {
            throw new AccountExistedException(userRequest.getUsername());
        }
        UserEntity userEntity = new UserEntity();
        RoleEntity roleEntity = roleRepository.getOne(userRequest.getRole());

        userEntity.setEmail(userRequest.getEmail());
        userEntity.setPassword(userRequest.getPassword());
        userEntity.setRoleEntity(roleEntity);
        userEntity.setUsername(userRequest.getUsername());
        userEntity.setName(userRequest.getName());
        userEntity.setAge(userRequest.getAge());
        userRepository.save(userEntity);

        return userResponse(userEntity);
    }

    @Override
    public List<ListFilmResponse> getListFilm() {
        List<ListFilmResponse> listFilmResponses = new ArrayList<>();
        List<FilmEntity> filmEntities = filmRepository.findAll();
        for (FilmEntity filmEntity : filmEntities) {
            ListFilmResponse listFilmResponse = new ListFilmResponse();
            listFilmResponse.setId(filmEntity.getId());
            listFilmResponse.setName(filmEntity.getName());
            listFilmResponse.setImage(filmEntity.getImage());
            listFilmResponses.add(listFilmResponse);
        }
        return listFilmResponses;
    }

    @Override
    public FilmEntity geFilmById(Long id) {
        FilmEntity filmEntity = new FilmEntity();
        if (filmRepository.findById(id).isPresent()) {
            filmEntity = filmRepository.findById(id).get();
        }
        return filmEntity;
    }

    @Override
    public UserResponse updateUser(UpdateUserRequest updateUserRequest) {
        UserEntity userEntity = userRepository.getOne(updateUserRequest.getId());
        userEntity.setAge(updateUserRequest.getAge());
        userEntity.setName(updateUserRequest.getName());
        userEntity.setPassword(updateUserRequest.getPassword());
        userEntity.setEmail(updateUserRequest.getEmail());
        userRepository.save(userEntity);
        return userResponse(userEntity);
    }

    @Override
    public TicketResponse order(OrderTicketRequest orderTicketRequest) {
        UserEntity userEntity = userRepository.findById(orderTicketRequest.getUserId()).get();
        RoomEntity roomEntity = roomRepository.getOne(orderTicketRequest.getRoomId());
        FilmEntity filmEntity = scheduleRepository.findAllByRoomEntityAndStartTime(roomEntity, orderTicketRequest.getStartTime()).getFilmEntity();
        TicketResponse ticketResponse = new TicketResponse();
        ticketResponse.setCustomerName(userEntity.getName());
        ticketResponse.setFilm(filmEntity.getName());
        ticketResponse.setTimeStart(orderTicketRequest.getStartTime());
        Date d = new Date();
        long milliseconds = d.getTime();
        ticketResponse.setOrderDate(milliseconds);
        ticketResponse.setRoom(roomEntity.getName());
        ticketResponse.setPrice(String.valueOf(filmEntity.getPrice()));
        ticketResponse.setSeatsNumber(orderTicketRequest.getSeats().toString());
        ticketResponse.setPayment(orderTicketRequest.isPayment());

        TicketEntity ticketEntity = new TicketEntity();
        ticketEntity.setNumberSeats(orderTicketRequest.getSeats().toString());
        ticketEntity.setPayment(ticketResponse.isPayment());
        int price = filmEntity.getPrice() * orderTicketRequest.getSeats().size();
        ticketEntity.setPrice(String.valueOf(price));
        ticketEntity.setTimeStart(ticketResponse.getTimeStart());
        ticketEntity.setFilm(filmEntity);
        ticketEntity.setRoom(roomEntity);
        ticketEntity.setUser(userEntity);
        ticketEntity.setDate(milliseconds);
        ticketEntity = ticketRepository.save(ticketEntity);
        ticketResponse.setId(ticketEntity.getId());
        return ticketResponse;
    }

    @Override
    public BookingResponse bookingFilm(Long idFilm) {
        BookingResponse bookingResponse = new BookingResponse();
        List<Location> locations = new ArrayList<>();
        FilmEntity filmEntity = filmRepository.findById(idFilm).get();

        List<ScheduleFilmEntity> filmEntities = scheduleRepository.findAllByFilmEntity(filmEntity);
        Set<String> location = new HashSet<>();

        for (ScheduleFilmEntity scheduleFilmEntity : filmEntities) {
            location.add(scheduleFilmEntity.getLocation().getLocation());
        }
        bookingResponse.setPoster(filmEntities.get(0).getFilmEntity().getPoster());
        bookingResponse.setLinkTrailer(filmEntities.get(0).getFilmEntity().getLink());
        bookingResponse.setName(filmEntities.get(0).getFilmEntity().getName());

        for (String s : location) {
            List<LocaTionResponse> locaTionResponses = new ArrayList<>();
            Location location1 = new Location();
            List<String> startTimes = new ArrayList<>();
            location1.setLocation(s);
            for (ScheduleFilmEntity scheduleFilmEntity : filmEntities) {
                if (scheduleFilmEntity.getLocation().getLocation().equals(s)) {
                    BookingFilmResponse bookingFilmResponse = new BookingFilmResponse();
                    LocaTionResponse locaTionResponse = new LocaTionResponse();
                    locaTionResponse.setDate(scheduleFilmEntity.getDate());
                    bookingFilmResponse.setId(scheduleFilmEntity.getRoomEntity().getId());
                    bookingFilmResponse.setRoom(scheduleFilmEntity.getRoomEntity().getName());
                    bookingFilmResponse.setStartTime(startTimes);
                    startTimes.add(scheduleFilmEntity.getStartTime());
                    locaTionResponses.add(locaTionResponse);
                    location1.setSchedule(locaTionResponses);
                    locaTionResponse.setRoom(bookingFilmResponse);
                }
            }
            locations.add(location1);
        }
        bookingResponse.setLocation(locations);
        return bookingResponse;
    }

    @Override
    public SeatBookingResponse seatBookingResponse(SeatsBookingRequest seatsBookingRequest) {
        SeatBookingResponse seatBookingResponse = new SeatBookingResponse();
        RoomEntity roomEntity = roomRepository.getOne(seatsBookingRequest.getIdRoom());
        ScheduleFilmEntity scheduleFilmEntity = scheduleRepository.findAllByRoomEntityAndStartTime(roomEntity, seatsBookingRequest.getTime());

        seatBookingResponse.setFilmName(scheduleFilmEntity.getFilmEntity().getName());
        seatBookingResponse.setTime(scheduleFilmEntity.getFilmEntity().getTime());
        List<SeatsResponse> seats = new ArrayList<>();
        for (int i = 1; i <= roomEntity.getMaxSeats(); i++) {
            SeatsResponse seatsResponse = new SeatsResponse();
            if (roomEntity.getEmptySeats().contains(String.valueOf(i))) {
                seatsResponse.setNumber(i);
                seatsResponse.setStatus(true);
            } else if (roomEntity.getSelectedSeat().contains(String.valueOf(i))) {
                seatsResponse.setNumber(i);
                seatsResponse.setStatus(false);
            } else {
                seatsResponse.setNumber(i);
                seatsResponse.setStatus(true);
            }
            seats.add(seatsResponse);
        }
        seatBookingResponse.setSeats(seats);
        return seatBookingResponse;
    }

    private UserResponse userResponse(UserEntity userEntity) {
        UserResponse userResponse = new UserResponse();
        userResponse.setEmail(userEntity.getEmail());
        userResponse.setPassword(userEntity.getPassword());
        userResponse.setUsername(userEntity.getUsername());
        userResponse.setId(userEntity.getId());
        userResponse.setAge(userEntity.getAge());
        userResponse.setName(userEntity.getName());
        return userResponse;
    }
}
