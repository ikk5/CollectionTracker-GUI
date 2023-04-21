import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {StorageService} from "../services/storage.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    content?: string;
    users: string[] = [];
    isLoggedIn: boolean = false;
    username?: string;

    constructor(private userService: UserService,
                private storageService: StorageService) {
    }

    ngOnInit(): void {
        this.isLoggedIn = this.storageService.isLoggedIn();
        this.username = this.storageService.getUser().username;

        this.userService.getUsers().subscribe({
            next: data => {
                this.users = data;
            },
            error: err => {
                console.log(err)
                if (err.error) {
                    this.content = JSON.parse(err.error).message;
                } else {
                    this.content = "Error with status: " + err.status;
                }
            }
        });
    }
}
