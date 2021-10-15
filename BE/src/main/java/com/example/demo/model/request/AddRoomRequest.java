package com.example.demo.model.request;

import com.example.demo.model.entity.LocationEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
public class AddRoomRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int maxSeats;

    private String emptySeats;

    private String selectedSeat;

    private String location;
}
