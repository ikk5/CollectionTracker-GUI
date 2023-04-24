import {Component, OnInit} from '@angular/core';
import {Collectible} from "../../../models/collectible.model";
import {CollectibleService} from "../../../services/collectible.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {Location} from "@angular/common";
import {StorageService} from "../../../services/storage.service";
import {AppComponent} from "../../../app.component";

@Component({
    selector: 'app-collectible-details',
    templateUrl: './collectible-details.component.html',
    styleUrls: ['./collectible-details.component.css']
})
export class CollectibleDetailsComponent implements OnInit {

    currentCollectible: Collectible = {
        name: '',
        subcategory: undefined,
        images: [],
        triples: []
    };

    collectibleId?: number;
    message = '';
    ownerIsLoggedIn: boolean = false;
    username: string = '';

    constructor(
        private collectibleService: CollectibleService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private storageService: StorageService,
        private appComponent: AppComponent) {
    }

    ngOnInit(): void {
        this.username = this.storageService.getUser().username;
        this.collectibleId = history.state.collectibleId;
        console.log(this.collectibleId);
        this.getCollectible();
    }

    updateCollectible(): void {
        this.router.navigateByUrl('updateCollectible', {state: {collectible: this.currentCollectible}});
    }

    deleteCollectible(): void {
        this.collectibleService.delete(this.currentCollectible.id)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.appComponent.retrieveCategories();
                    this.location.back();
                },
                error: (e) => console.error(e)
            });
    }

    getCollectible(): void {
        this.collectibleService.get(this.collectibleId).subscribe({
            next: (data) => {
                console.log(data);
                this.ownerIsLoggedIn = this.username == data.subcategory!.username;
                this.currentCollectible = data;
            },
            error: (e) => console.error(e)
        });
    }
}
