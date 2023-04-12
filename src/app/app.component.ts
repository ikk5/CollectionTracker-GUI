import {Component} from '@angular/core';
import {Category} from "./models/category.model";
import {CategoryService} from "./services/category.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CollectionTracker-GUI';
  categories?: Category[];

  constructor(private categoryService: CategoryService) {
    this.retrieveCategories();
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

}
