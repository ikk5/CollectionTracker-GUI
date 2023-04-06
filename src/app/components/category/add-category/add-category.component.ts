import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {Subcategory} from "../../../models/subcategory.model";

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

    category: Category = {
        name: '',
        subcategories: [new Subcategory()]
    };
    submitted = false;

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit(): void {
    }

    saveCategory(): void {
        const data = {
            name: this.category.name,
            subcategories: this.category.subcategories
        };

        this.categoryService.create(data)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.submitted = true;
                },
                error: (e) => console.error(e)
            });
    }

    newCategory(): void {
        this.submitted = false;
        this.category = {
            name: '',
            subcategories: [new Subcategory()]
        };
    }

    addNewSubcategory() {
        this.category.subcategories?.push(new Subcategory());
    }

    removeSubcategory(index: number) {
        this.category.subcategories?.splice(index, 1);
    }
}
