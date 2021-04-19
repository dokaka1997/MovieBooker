package com.example.demo.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "room")
public class RoomEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<FilmEntity> filmId;

    @Column(name = "max_seats")
    private int maxSeats;

    @Column(name = "empty_seats")
    private String emptySeats;

    @Column(name = "selected_seat")
    private String selectedSeat;

}