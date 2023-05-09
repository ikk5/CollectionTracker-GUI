import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {CollectibleService} from "../../services/collectible.service";
import {AppComponent} from "../../app.component";
import {CategoryService} from "../../services/category.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {saveAs} from "file-saver-es";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser: any;
    busyExporting: boolean = false;

    constructor(private storageService: StorageService,
                private collectibleService: CollectibleService,
                private categoryService: CategoryService,
                private http: HttpClient,
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

    export(): void {
        this.busyExporting = true;
        const download: Observable<any> = this.http.get("export", {responseType: 'arraybuffer'});
        download.subscribe((buffer) => {
            this.busyExporting = false;
            const data: Blob = new Blob([buffer], {
                type: 'application/zip'
            });
            saveAs(data, "export.zip");
        });
    }
}
