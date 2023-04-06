import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {CategoriesListComponent} from "../categories-list/categories-list.component";

@Component({
    selector: 'app-category-details',
    templateUrl: './category-details.component.html'
})
export class CategoryDetailsComponent {

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

    updateCategory(): void {
        this.router.navigateByUrl('updateCategory',
            {state: {category: this.currentCategory}});
    }

    deleteCategory(): void {
        this.categoryService.delete(this.currentCategory.id)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.categoriesListComponent.refreshList();
                },
                error: (e) => console.error(e)
            });
    }
}
