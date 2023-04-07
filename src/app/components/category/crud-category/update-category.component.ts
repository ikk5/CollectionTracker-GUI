import {Component} from '@angular/core';
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {Subcategory} from "../../../models/subcategory.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-update-category',
    templateUrl: './update-category.component.html',
    styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {

    currentCategory: Category;

    constructor(private categoryService: CategoryService,
                private route: ActivatedRoute,
                private router: Router) {
        this.currentCategory = history.state.category;
        if (!this.currentCategory?.id) {
            this.newCategory();
        }
    }

    saveCategory(): void {
        if (this.currentCategory.id) {
            this.updateCategory();
        } else {
            this.saveNewCategory();
        }
    }

    saveNewCategory(): void {
        this.categoryService.create(this.currentCategory)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.router.navigate(['/categories']);
                },
                error: (e) => console.error(e)
            });
    }

    updateCategory(): void {
        this.categoryService.update(this.currentCategory.id, this.currentCategory)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.router.navigate(['/categories']);
                },
                error: (e) => console.error(e)
            });
    }

    newCategory(): void {
        this.currentCategory = {
            name: '',
            subcategories: [new Subcategory()]
        };
    }

    addNewSubcategory() {
        this.currentCategory.subcategories?.push(new Subcategory());
    }

    removeSubcategory(index: number) {
        this.currentCategory.subcategories?.splice(index, 1);
    }
}
