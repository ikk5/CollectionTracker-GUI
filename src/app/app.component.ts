import {Component, ViewChild} from '@angular/core';
import {Category} from "./models/category.model";
import {CategoryService} from "./services/category.service";
import {Subcategory} from "./models/subcategory.model";
import {Router} from "@angular/router";
import {StorageService} from "./services/storage.service";
import {AuthService} from "./services/auth.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'CollectionTracker-GUI';
    isLoggedIn = false;
    username?: string;
    categories?: Category[];

    @ViewChild('sidenav') sidenav!: MatSidenav;


    constructor(private categoryService: CategoryService,
                private router: Router,
                private storageService: StorageService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.isLoggedIn = this.storageService.isLoggedIn();

        if (this.isLoggedIn) {
            const user = this.storageService.getUser();

            this.username = user.username;
        }
        this.retrieveCategories();
    }

    logout(): void {
        this.authService.logout().subscribe({
            next: res => {
                console.log(res);
                this.storageService.clean();

                this.router.navigate(['/']).then(() => {
                    window.location.reload(); // This reload refreshes the top navbar.
                })
            },
            error: err => {
                console.log(err);
            }
        });
    }

    retrieveCategories(): void {
        this.categoryService.getAll()
            .subscribe({
                next: (data) => {
                    this.categories = data;
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }

    chooseCategory(cat: Category): void {
        this.router.navigateByUrl('collection', {state: {category: cat}});
    }

    chooseSubcategory(subcat: Subcategory): void {
        this.router.navigateByUrl('collection', {state: {subcategory: subcat}});
    }

    updateCategory(selectedCategory: Category): void {
        this.router.navigateByUrl('updateCategory',
            {state: {category: selectedCategory}});
    }

    countCategoryTotals(cat: Category): number {
        let count: number = 0;
        for (let subcat of cat.subcategories ? cat.subcategories : []) {
            count += subcat.collectibleCount;
        }
        return count;
    }

    // Only hide the sidebar onclick on mobile
    hideSidenavAfterClick() {
        if (window.innerWidth <= 800) {
            this.sidenav.toggle();
        }
    }
}
