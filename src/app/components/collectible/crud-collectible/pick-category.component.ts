import {Component, OnInit} from '@angular/core';
import {Collectible} from "../../../models/collectible.model";
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-pick-category',
    templateUrl: './pick-category.component.html',
    styleUrls: ['./pick-category.component.css']
})
export class PickCategoryComponent implements OnInit {

    collectible: Collectible = new Collectible();

    categories: Category[] = [];
    selectedCategory?: Category;

    constructor(private categoryService: CategoryService,
                private router: Router) {
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

    chooseCategory(cat: Category): void {
        this.router.navigateByUrl('updateCollectible', {state: {category: cat, collectible: this.collectible}});
    }
}
