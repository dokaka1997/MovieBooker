package com.example.demo.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "schedule")
public class ScheduleFilm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "film")
    private FilmEntity filmEntity;

    @ManyToOne
    @JoinColumn(name = "room")
    private RoomEntity roomEntity;

    @Column(name = "date")
    private Long date;
}
