package com.example.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class User implements Serializable {
    private static final long serialVersionUID = 7156526077883281623L;
    private String name;
    private String id;
}
