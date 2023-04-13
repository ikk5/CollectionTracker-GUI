import {Component} from '@angular/core';
import {Category} from "./models/category.model";
import {CategoryService} from "./services/category.service";
import {Subcategory} from "./models/subcategory.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'CollectionTracker-GUI';
    categories?: Category[];

    constructor(private categoryService: CategoryService,
                private router: Router) {
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
        this.router.navigateByUrl('collectibles', {state: {category: cat}});
    }

    chooseSubcategory(subcat: Subcategory): void {
        this.router.navigateByUrl('collectibles', {state: {subcategory: subcat}});
    }
}
