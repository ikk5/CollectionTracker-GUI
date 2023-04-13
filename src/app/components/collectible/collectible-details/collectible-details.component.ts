import {Component, OnInit} from '@angular/core';
import {Collectible} from "../../../models/collectible.model";
import {CollectibleService} from "../../../services/collectible.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";

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

    constructor(
        private collectibleService: CollectibleService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router) {
        this.collectibleId = history.state.collectibleId;
        this.getCollectible();
        console.log(this.collectibleId);
    }

    ngOnInit(): void {
        // if (!this.viewMode) {
        //     this.message = '';
        // }
    }

    updateCollectible(): void {
        this.router.navigateByUrl('updateCollectible', {state: {collectible: this.currentCollectible}});
    }

    deleteCollectible(): void {
        this.collectibleService.delete(this.currentCollectible.id)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    // this.router.navigateByUrl('collectibles', {state: {subcategory: this.currentCollectible.subcategory}});
                    this.message = res?.message ? res.message : 'Deleted';
                },
                error: (e) => console.error(e)
            });
    }

    getCollectible(): void {
        this.collectibleService.get(this.collectibleId).subscribe({
            next: (data) => {
                console.log(data);
                this.currentCollectible = data;
            },
            error: (e) => console.error(e)
        });
    }
}
