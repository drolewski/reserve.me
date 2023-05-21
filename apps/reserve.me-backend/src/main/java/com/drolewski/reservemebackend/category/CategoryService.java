package com.drolewski.reservemebackend.category;

import com.drolewski.reservemebackend.category.db.Category;
import com.drolewski.reservemebackend.category.db.CategoryRepository;
import com.drolewski.reservemebackend.category.model.CategoryRequest;
import com.drolewski.reservemebackend.category.model.CategoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    List<CategoryResponse> getCategories() {
        return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"))
                .stream()
                .map(category -> CategoryResponse.builder()
                        .name(category.getName())
                        .build())
                .toList();
    }

    public void addCategory(final CategoryRequest categoryRequest) {
        categoryRepository.save(Category.builder()
                .name(categoryRequest.getName())
                .build());
    }

}
