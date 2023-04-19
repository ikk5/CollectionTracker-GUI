import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {CollectibleService} from "../../services/collectible.service";
import {AppComponent} from "../../app.component";
import {CategoryService} from "../../services/category.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser: any;

    constructor(private storageService: StorageService,
                private collectibleService: CollectibleService,
                private categoryService: CategoryService,
                private appComponent: AppComponent) {
    }

    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();
    }

    removeAllCollectibles(): void {
        this.collectibleService.deleteAll()
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.appComponent.retrieveCategories();
                },
                error: (e) => console.error(e)
            });
    }

    removeAllCategories(): void {
        this.categoryService.deleteAll()
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.appComponent.retrieveCategories();
                },
                error: (e) => console.error(e)
            });
    }
}
