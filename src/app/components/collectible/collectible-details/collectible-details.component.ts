import {Component, Input, OnInit} from '@angular/core';
import {Collectible} from "../../../models/collectible.model";
import {CollectibleService} from "../../../services/collectible.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category.model";

@Component({
    selector: 'app-collectible-details',
    templateUrl: './collectible-details.component.html',
    styleUrls: ['./collectible-details.component.css']
})
export class CollectibleDetailsComponent implements OnInit {

    @Input() viewMode = false;

    @Input() currentCollectible: Collectible = {
        name: '',
        subcategory: undefined
    };

    message = '';
    categories: Category[] = [];
    selectedCategory?: Category;

    constructor(
        private collectibleService: CollectibleService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        if (!this.viewMode) {
            this.message = '';
            this.retrieveCategories();
            this.getCollectible(this.route.snapshot.params["id"]);
        }
    }

    initCategory(): void {
        if (this.selectedCategory === undefined && this.categories.length != 0 && this.currentCollectible.name !== '') {
            for (let category of this.categories) {
                if (category.name === this.currentCollectible?.subcategory?.category) {
                    this.selectedCategory = category;
                    break;
                }
            }
        }
    }

    getCollectible(id: string): void {
        this.collectibleService.get(id)
            .subscribe({
                next: (data) => {
                    this.currentCollectible = data;
                    this.initCategory();
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }

    updateCollectible(): void {
        this.message = '';

        this.collectibleService.update(this.currentCollectible.id, this.currentCollectible)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.message = res.message ? res.message : 'This collectible was updated successfully!';
                },
                error: (e) => console.error(e)
            });
    }

    deleteCollectible(): void {
        this.collectibleService.delete(this.currentCollectible.id)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.router.navigate(['/collectibles']);
                },
                error: (e) => console.error(e)
            });
    }

    retrieveCategories(): void {
        this.categoryService.getAll()
            .subscribe({
                next: (data) => {
                    this.categories = data;
                    this.initCategory();
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }
}
