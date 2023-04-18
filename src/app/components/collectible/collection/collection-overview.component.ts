import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subcategory} from "../../../models/subcategory.model";

@Component({
    selector: 'app-collection-overview',
    templateUrl: './collection-overview.component.html',
    styleUrls: ['./collection-overview.component.css']
})
export class CollectionOverviewComponent implements OnInit {

    username: any;
    categories: Category[] = [];

    constructor(private categoryService: CategoryService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.username = params.get('user');
            this.retrieveCategories();

        });
    }

    retrieveCategories(): void {
        this.categoryService.getAllForUser(this.username)
            .subscribe({
                next: (data) => {
                    this.categories = data;
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }

    chooseCategory(cat: Category): void {
        this.router.navigateByUrl('collection', {state: {category: cat}});
    }

    chooseSubcategory(subcat: Subcategory): void {
        this.router.navigateByUrl('collection', {state: {subcategory: subcat}});
    }
}
