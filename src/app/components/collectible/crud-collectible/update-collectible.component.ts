import {Component, OnInit} from '@angular/core';
import {Collectible} from "../../../models/collectible.model";
import {CollectibleService} from "../../../services/collectible.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {ImageLink} from "../../../models/image.model";

@Component({
    selector: 'app-update-collectible',
    templateUrl: './update-collectible.component.html',
    styleUrls: ['./update-collectible.component.css']
})
export class UpdateCollectibleComponent implements OnInit {

    currentCollectible: Collectible;

    currentCategory?: Category;

    message = '';

    submitted: boolean = false;

    constructor(
        private collectibleService: CollectibleService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router) {
        this.currentCollectible = history.state.collectible;
        this.currentCategory = history.state.category;
    }

    ngOnInit(): void {
        if (!this.currentCategory && this.currentCollectible.id) {
            this.getCategory();
        }
    }

    getCategory(): void {
        this.categoryService.get(this.currentCollectible.subcategory?.categoryId)
            .subscribe({
                next: (data) => {
                    this.currentCategory = data;
                    for (let subcat of data.subcategories ? data.subcategories : []) {
                        if (subcat.subcategory == this.currentCollectible.subcategory?.subcategory) {
                            // Dit forceert een update van de dropdown wordt bijgewerkt.
                            // TODO: dit moet toch netter kunnen...
                            this.currentCollectible.subcategory = subcat;
                        }
                    }
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }

    saveCollectible(): void {
        if (this.currentCollectible.id) {
            this.updateCollectible();
        } else {
            this.saveNewCollectible();
        }
    }

    updateCollectible(): void {
        this.message = '';

        this.collectibleService.update(this.currentCollectible.id, this.currentCollectible)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.submitted = true;
                    this.message = res.message ? res.message : 'This collectible was updated successfully!';
                },
                error: (e) => console.error(e)
            });
    }

    saveNewCollectible(): void {
        this.collectibleService.create(this.currentCollectible)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.submitted = true;
                    this.message = res.message ? res.message : 'This collectible was saved successfully!';
                },
                error: (e) => console.error(e)
            });
    }

    newCollectible() {
        this.currentCollectible = {
            name: '',
            images: [new ImageLink()]
        };
        this.submitted = false;
        this.message = '';
    }

    addNewImage() {
        this.currentCollectible.images?.push(new ImageLink());
    }

    removeImage(index: number) {
        this.currentCollectible.images?.splice(index, 1);
    }
}
