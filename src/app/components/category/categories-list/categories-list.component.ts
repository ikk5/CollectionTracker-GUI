import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

    categories?: Category[];
    currentCategory: Category = {};
    currentIndex = -1;
    title = '';

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this.retrieveCategories();
    }

    retrieveCategories(): void {
        this.categoryService.getAll()
            .subscribe({
                next: (data) => {
                    this.categories = data;
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }

    refreshList(): void {
        this.retrieveCategories();
        this.currentCategory = {};
        this.currentIndex = -1;
    }

    setActiveCategory(category: Category, index: number): void {
        this.currentCategory = category;
        this.currentIndex = index;
    }

    removeAllCategories(): void {
        this.categoryService.deleteAll()
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.refreshList();
                },
                error: (e) => console.error(e)
            });
    }

    searchName(): void {
        this.currentCategory = {};
        this.currentIndex = -1;

        this.categoryService.findByName(this.title)
            .subscribe({
                next: (data) => {
                    this.categories = data;
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }

}
