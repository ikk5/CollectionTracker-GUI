import {Component, OnInit} from '@angular/core';
import {Collectible} from "../../../models/collectible.model";
import {CollectibleService} from "../../../services/collectible.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {ImageLink} from "../../../models/image.model";
import {Triple} from "../../../models/triple.model";
import {AppComponent} from "../../../app.component";

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
        private router: Router,
        private appComponent: AppComponent) {
        this.currentCollectible = history.state.collectible;
        this.currentCategory = history.state.category;
    }

    ngOnInit(): void {
        if (!this.currentCategory && this.currentCollectible.id) {
            this.getCategory();
        } else {
            this.addQuestions();
        }
    }

    getCategory(): void {
        this.categoryService.get(this.currentCollectible.subcategory?.categoryId)
            .subscribe({
                next: (data) => {
                    this.currentCategory = data;
                    for (let subcat of data.subcategories ? data.subcategories : []) {
                        if (subcat.subcategory == this.currentCollectible.subcategory?.subcategory) {
                            // Dit forceert een update zodat de dropdown wordt bijgewerkt.
                            // TODO: dit moet toch netter kunnen...
                            this.currentCollectible.subcategory = subcat;
                        }
                        this.addQuestions();
                    }
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }

    addQuestions() {
        for (let question of (this.currentCategory?.questions ? this.currentCategory.questions : [])) {
            let found: boolean = false;
            for (let triple of (this.currentCollectible?.triples ? this.currentCollectible.triples : [])) {
                if (triple.question?.id == question.id) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.currentCollectible.triples?.push(new Triple(question));
            }
        }
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
                    this.appComponent.retrieveCategories();
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
                    this.currentCollectible.id = res.id;
                    this.appComponent.retrieveCategories();
                },
                error: (e) => console.error(e)
            });
    }

    newCollectible() {
        this.currentCollectible = {
            name: '',
            images: [new ImageLink()],
            triples: []
        };
        this.addQuestions();
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
