package com.drolewski.reservemebackend.category.db;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder(toBuilder = true)
@Document
public class Category {
    @Id
    private String id;

    @Indexed(unique = true)
    private String name;
}
