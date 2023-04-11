import {Component, Input, OnInit} from '@angular/core';
import {Collectible} from "../../../models/collectible.model";
import {CollectibleService} from "../../../services/collectible.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {CollectiblesListComponent} from "../collectibles-list/collectibles-list.component";

@Component({
    selector: 'app-collectible-details',
    templateUrl: './collectible-details.component.html',
    styleUrls: ['./collectible-details.component.css']
})
export class CollectibleDetailsComponent implements OnInit {

    @Input() viewMode = false;

    @Input() currentCollectible: Collectible = {
        name: '',
        subcategory: undefined,
        images: [],
        triples: []
    };

    message = '';

    constructor(
        private collectibleService: CollectibleService,
        private categoryService: CategoryService,
        private collectiblesListComponent: CollectiblesListComponent,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        if (!this.viewMode) {
            this.message = '';
        }
    }

    updateCollectible(): void {
        this.router.navigateByUrl('updateCollectible',
            {state: {collectible: this.currentCollectible}});
    }

    deleteCollectible(): void {
        this.collectibleService.delete(this.currentCollectible.id)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.message = res?.message ? res.message : '';
                    this.collectiblesListComponent.refreshList();
                },
                error: (e) => console.error(e)
            });
    }
}
