import {Component} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {HttpClient} from "@angular/common/http";
import {AppComponent} from "../../app.component";
import {Observable} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.css']
})
export class ImportComponent {
    isLoggedIn: boolean = false;
    filename: string = '';
    wrongFileType: boolean = false;
    allowedFileTypes: string[] = ['xls', 'xlsx'];
    message?: string;

    constructor(private storageService: StorageService,
                private http: HttpClient,
                private appComponent: AppComponent) {
        this.isLoggedIn = storageService.isLoggedIn();
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.message = undefined;
        if (file) {
            const extension = file.name.split('.')[1].toLowerCase();
            if (this.allowedFileTypes.includes(extension)) {
                this.wrongFileType = false;
                this.filename = file.name;
                const formData = new FormData();
                formData.append("file", file);
                const upload: Observable<any> = this.http.post("import", formData);
                upload.subscribe({
                    next: (res) => {
                        console.log(res);
                        this.appComponent.retrieveCategories();
                        this.message = res.message ? res.message : 'Collection imported successfully!';
                    },
                    error: (e) => {
                        this.message = e.error?.message ? e.error.message : "The request failed for some reason.";
                        console.error(e);
                    }
                });
            } else {
                this.wrongFileType = true;
                this.filename = '';
            }
        }
    }

}