package com.example.demo.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "film")
public class FilmEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;

    @Column(name = "publicationDate")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date publicationDate;

    @Column(name = "type")
    private String type;

    @Column(name = "age")
    private int age;

    @Column(name = "mainActor")
    private String mainActor;

}
