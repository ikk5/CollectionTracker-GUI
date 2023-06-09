import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {Subcategory} from "../../../models/subcategory.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../../models/question.model";
import {AppComponent} from "../../../app.component";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../services/storage.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
    selector: 'app-update-category',
    templateUrl: './update-category.component.html',
    styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

    categoryForm!: FormGroup;

    currentCategory: Category;

    datatypes?: string[];
    message = '';
    submitted: boolean = false;

    constructor(private categoryService: CategoryService,
                private appComponent: AppComponent,
                private route: ActivatedRoute,
                private router: Router,
                private formbuilder: FormBuilder,
                private storageService: StorageService) {
        router.routeReuseStrategy.shouldReuseRoute = function () { // TODO: deprecated; find alternative
            return false;
        }

        this.currentCategory = history.state.category;
        if (!this.currentCategory?.id) {
            this.newCategory();
        }
    }

    ngOnInit() {
        this.initDatatypes();

        this.categoryForm = this.formbuilder.group({
            name: [this.currentCategory.name, [Validators.required]],
            subcategories: this.formbuilder.array([]),
            questions: this.formbuilder.array([])
        });

        if (this.currentCategory.subcategories && this.currentCategory.subcategories.length > 0) {
            this.currentCategory.subcategories.forEach(subcat => {
                const subcategoryForm = this.buildSubcatForm(subcat);
                this.subcategoriesFormArray().push(subcategoryForm);
            });
        } else {
            const subcategoryForm = this.buildSubcatForm(new Subcategory());
            this.subcategoriesFormArray().push(subcategoryForm);
        }

        if (this.currentCategory.questions && this.currentCategory.questions.length > 0) {
            this.currentCategory.questions.forEach(question => {
                const questionForm = this.buildQuestionForm(question);
                this.questionsFormArray().push(questionForm);
            });
        } else {
            const questionForm = this.buildQuestionForm(new Question());
            this.questionsFormArray().push(questionForm);
        }
    }

    buildSubcatForm(subcat: Subcategory): FormGroup {
        return this.formbuilder.group({
            id: [subcat.subcategoryId],
            subcategory: [subcat.subcategory]
        })
    }

    buildQuestionForm(question: Question): FormGroup {
        const questionsForm = this.formbuilder.group({
            id: [question.id],
            question: [question.question],
            datatype: [question.datatype],
            defaultValue: [question.defaultValue],
            hidden: [question.hidden],
            listColumn: [question.listColumn],
            filterColumn: [question.filterColumn],
            dropdownOptions: this.formbuilder.array([])
        });

        if (question.dropdownOptions) {
            question.dropdownOptions.split(';').forEach(option => {
                const optionForm = this.buildDropdownForm(option);
                (questionsForm.get('dropdownOptions') as FormArray).push(optionForm);
            });
        } else {
            const optionForm = this.buildDropdownForm('');
            (questionsForm.get('dropdownOptions') as FormArray).push(optionForm);
        }

        return questionsForm;
    }

    subcategoriesFormArray(): FormArray {
        return this.categoryForm.get('subcategories') as FormArray;
    }

    questionsFormArray(): FormArray {
        return this.categoryForm.get('questions') as FormArray;
    }

    getDropdownOptionsFormArray(index: number): FormArray {
        return this.questionsFormArray().controls[index].get('dropdownOptions') as FormArray;
    }

    buildDropdownForm(option: string): FormGroup {
        return this.formbuilder.group({
            option: [option]
        });
    }

    saveCategory(): void {
        this.copyFormToObject();
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
                    console.log(res);
                    this.handleCategoryChange(res);
                    this.submitted = true;
                    this.message = res.message ? res.message : 'This category was saved successfully!';
                },
                error: (e) => {
                    this.submitted = true;
                    this.message = e.error?.message ? e.error.message : "The request failed for some reason.";
                    console.error(e);
                }
            });
    }

    updateCategory(): void {
        this.categoryService.update(this.currentCategory.id, this.currentCategory)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.handleCategoryChange(res);
                    this.submitted = true;
                    this.message = res.message ? res.message : 'This category was saved successfully!';
                },
                error: (e) => {
                    this.submitted = true;
                    this.message = e.error?.message ? e.error.message : "The request failed for some reason.";
                    console.error(e);
                }
            });
    }


    private handleCategoryChange(res: any) {
        console.log(res);
        this.appComponent.retrieveCategories();
        this.router.navigateByUrl('/collection/' + this.storageService.getUser().username);
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
        this.submitted = false;
        this.currentCategory = {
            name: '',
            subcategories: [new Subcategory()],
            questions: [new Question()]
        };
    }

    addNewSubcategory() {
        this.subcategoriesFormArray().push(this.buildSubcatForm(new Subcategory()));
    }

    removeSubcategory(index: number) {
        this.subcategoriesFormArray().removeAt(index);
    }

    addNewQuestion() {
        this.questionsFormArray().push(this.buildQuestionForm(new Question()));
    }

    removeQuestion(index: number) {
        this.questionsFormArray().removeAt(index);
    }

    removeDropdownOption(questionIndex: number, optionIndex: number) {
        this.getDropdownOptionsFormArray(questionIndex).removeAt(optionIndex);
    }

    addDropdownOption(questionIndex: number) {
        this.getDropdownOptionsFormArray(questionIndex).push(this.buildDropdownForm(''));
    }

    deleteCategory(): void {
        this.categoryService.delete(this.currentCategory.id)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.appComponent.retrieveCategories();
                    this.submitted = true;
                    this.message = res.message ? res.message : "Category has been deleted successfully.";
                },
                error: (e) => console.error(e)
            });
    }

    copyFormToObject(): void {
        const catFormModel = this.categoryForm.value;
        this.currentCategory.name = catFormModel.name;

        let counter = 1;
        this.currentCategory.subcategories = [];
        for (const subcatFormModel of catFormModel.subcategories) {
            let subcat: Subcategory = new Subcategory();
            subcat.subcategoryId = subcatFormModel.id;
            subcat.subcategory = subcatFormModel.subcategory;
            subcat.displayOrder = counter;
            this.currentCategory.subcategories.push(subcat);
            counter++;
        }

        counter = 1;
        this.currentCategory.questions = [];
        for (const questionFormModel of catFormModel.questions) {
            let question: Question = new Question();
            question.id = questionFormModel.id;
            question.question = questionFormModel.question;
            question.datatype = questionFormModel.datatype;
            question.defaultValue = questionFormModel.defaultValue;
            question.hidden = questionFormModel.hidden;
            question.listColumn = questionFormModel.listColumn;
            question.filterColumn = questionFormModel.filterColumn;
            question.displayOrder = counter;

            let dropdownOptions: string[] = [];
            for (const optionFormModel of questionFormModel.dropdownOptions) {
                if (optionFormModel.option && optionFormModel.option != '') {
                    dropdownOptions.push(optionFormModel.option);
                }
            }
            question.dropdownOptions = dropdownOptions.join(';');
            this.currentCategory.questions.push(question);
            counter++;
        }
    }

    dropSubcategory(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.subcategoriesFormArray().controls, event.previousIndex, event.currentIndex);
        moveItemInArray(this.categoryForm.value.subcategories, event.previousIndex, event.currentIndex);
    }

    dropQuestion(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.questionsFormArray().controls, event.previousIndex, event.currentIndex);
        moveItemInArray(this.categoryForm.value.questions, event.previousIndex, event.currentIndex);
    }

    dropDropdownOption(event: CdkDragDrop<string[]>, index: number) {
        moveItemInArray(this.getDropdownOptionsFormArray(index).controls, event.previousIndex, event.currentIndex);
        moveItemInArray(this.categoryForm.value.questions[index].dropdownOptions, event.previousIndex, event.currentIndex);
    }
}
