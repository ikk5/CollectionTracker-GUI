import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {CategoriesListComponent} from "../categories-list/categories-list.component";
import {Subcategory} from "../../../models/subcategory.model";

@Component({
    selector: 'app-category-details',
    templateUrl: './category-details.component.html',
    styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

    @Input() viewMode = false;

    @Input() currentCategory: Category = {
        name: '',
    };

    message = '';

    constructor(
        private categoryService: CategoryService,
        private categoriesListComponent: CategoriesListComponent,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        if (!this.viewMode) {
            this.message = '';
            this.getCategory(this.route.snapshot.params["id"]);
        }
    }

    getCategory(id: string): void {
        this.categoryService.get(id)
            .subscribe({
                next: (data) => {
                    this.currentCategory = data;
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }

    updateCategory(): void {
        this.message = '';

        this.categoryService.update(this.currentCategory.id, this.currentCategory)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.categoriesListComponent.refreshList();
                    this.message = res.message ? res.message : 'This category was updated successfully!';
                },
                error: (e) => console.error(e)
            });
    }

    deleteCategory(): void {
        this.categoryService.delete(this.currentCategory.id)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.categoriesListComponent.refreshList();
                    this.router.navigate(['/categories']);
                },
                error: (e) => console.error(e)
            });
    }

    addNewSubcategory() {
        this.currentCategory?.subcategories?.push(new Subcategory());
    }

    removeSubcategory(index: number) {
        this.currentCategory?.subcategories?.splice(index, 1);
    }
}
