package com.example.demo.model.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "ticket")
public class TicketEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "film")
    private FilmEntity film;

    @ManyToOne
    @JoinColumn(name = "room")
    private RoomEntity room;

    @Column(name = "price")
    private String price;

    @Column(name = "payment")
    private boolean payment;

    @Column(name = "number_seats")
    private String numberSeats;

    @Column(name = "time_start")
    private String timeStart;

    @Column(name = "date")
    private Long date;
}
