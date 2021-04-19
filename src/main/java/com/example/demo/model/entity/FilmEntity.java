package com.example.demo.model.entity;

import com.example.demo.enumeration.FilmType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "film")
public class FilmEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(value = EnumType.STRING)
    private FilmType filmType;

    @Column(name = "age_limit")
    private int ageLimit;

    @Column(name = "actor")
    private String actor;

    @Column(name = "date_of_publication")
    private String dateOfpublication;

    @Column(name = "price")
    private int price;

    @Column(name = "time")
    private String time;

    @ManyToOne
    @JoinColumn(name = "rome")
    private RoomEntity room;


}