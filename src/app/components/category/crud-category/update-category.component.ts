import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {Subcategory} from "../../../models/subcategory.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../../models/question.model";
import {AppComponent} from "../../../app.component";

@Component({
    selector: 'app-update-category',
    templateUrl: './update-category.component.html',
    styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

    currentCategory: Category;

    datatypes?: string[];

    constructor(private categoryService: CategoryService,
                private appComponent: AppComponent,
                private route: ActivatedRoute,
                private router: Router) {
        this.currentCategory = history.state.category;
        if (!this.currentCategory?.id) {
            this.newCategory();
        }
    }

    ngOnInit() {
        this.initDatatypes();
    }


    saveCategory(): void {
        if (this.currentCategory.id) {
            this.updateCategory();
        } else {
            this.saveNewCategory();
        }
    }

    saveNewCategory(): void {
        this.categoryService.create(this.currentCategory)
            .subscribe({
                next: (res) => {
                    this.handleCategoryChange(res);
                },
                error: (e) => console.error(e)
            });
    }

    updateCategory(): void {
        this.categoryService.update(this.currentCategory.id, this.currentCategory)
            .subscribe({
                next: (res) => {
                    this.handleCategoryChange(res);
                },
                error: (e) => console.error(e)
            });
    }


    private handleCategoryChange(res: any) {
        console.log(res);
        this.appComponent.retrieveCategories();
        this.router.navigate(['/categories']);
    }

    initDatatypes(): void {
        this.categoryService.getAllDatatypes()
            .subscribe({
                next: (data) => {
                    this.datatypes = data;
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }

    newCategory(): void {
        this.currentCategory = {
            name: '',
            subcategories: [new Subcategory()],
            questions: [new Question()]
        };
    }

    addNewSubcategory() {
        this.currentCategory.subcategories?.push(new Subcategory());
    }

    removeSubcategory(index: number) {
        this.currentCategory.subcategories?.splice(index, 1);
    }

    addNewQuestion() {
        this.currentCategory.questions?.push(new Question());
    }

    removeQuestion(index: number) {
        this.currentCategory.questions?.splice(index, 1);
    }

    deleteCategory(): void {
        this.categoryService.delete(this.currentCategory.id)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.appComponent.retrieveCategories();
                    this.router.navigateByUrl('#');
                },
                error: (e) => console.error(e)
            });
    }
}
