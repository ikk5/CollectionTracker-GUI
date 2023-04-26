import {Component, OnInit} from '@angular/core';
import {Collectible} from "../../../models/collectible.model";
import {CollectibleService} from "../../../services/collectible.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../../models/category.model";
import {CategoryService} from "../../../services/category.service";
import {ImageLink} from "../../../models/image.model";
import {Triple} from "../../../models/triple.model";
import {AppComponent} from "../../../app.component";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-update-collectible',
    templateUrl: './update-collectible.component.html',
    styleUrls: ['./update-collectible.component.css']
})
export class UpdateCollectibleComponent implements OnInit {

    collectibleForm!: FormGroup;
    currentCollectible: Collectible;

    currentCategory?: Category;

    message = '';

    submitted: boolean = false;

    constructor(
        private collectibleService: CollectibleService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private router: Router,
        private appComponent: AppComponent,
        private formbuilder: FormBuilder,
        private datePipe: DatePipe) {
        this.currentCollectible = history.state.collectible;
        this.currentCategory = history.state.category;
    }

    ngOnInit(): void {
        if (!this.currentCategory && this.currentCollectible.id) {
            this.getCategory();
        } else {
            this.addQuestions();
        }
        this.buildCollectiblesForm();
    }

    buildCollectiblesForm() {
        this.collectibleForm = this.formbuilder.group({
            name: [this.currentCollectible.name, [Validators.required]],
            subcategory: [this.currentCollectible.subcategory, [Validators.required]],
            triples: this.formbuilder.array([]),
            images: this.formbuilder.array([])
        });

        if (this.currentCollectible.triples && this.currentCollectible.triples.length > 0) {
            this.currentCollectible.triples.forEach(triple => {
                const tripleForm = this.buildTripleForm(triple);
                this.triplesFormArray().push(tripleForm);
            });
        }

        if (this.currentCollectible.images && this.currentCollectible.images.length > 0) {
            this.currentCollectible.images.forEach(image => {
                const imageForm = this.buildImageForm(image);
                this.imagesFormArray().push(imageForm);
            });
        } else {
            const imageForm = this.buildImageForm(new ImageLink());
            this.imagesFormArray().push(imageForm);
        }
    }

    buildTripleForm(triple: Triple): FormGroup {
        let tripleValue: any = triple.value;
        if (triple.question.datatype === 'Date' && triple.value) {
            // In case of datatype Date we need to format the date string to an actual date, otherwise the datepicker breaks.
            if (tripleValue.includes('-')) {
                const [day, month, year] = tripleValue.split('-');
                tripleValue = new Date(+year, +month - 1, +day);
            } else {
                const [day, month, year] = tripleValue.split('/');
                tripleValue = new Date(+year, +month - 1, +day);
            }
        }
        return this.formbuilder.group({
            id: [triple.id],
            question: [triple.question],
            value: [tripleValue]
        })
    }

    buildImageForm(image: ImageLink): FormGroup {
        return this.formbuilder.group({
            url: [image.url]
        })
    }

    triplesFormArray(): FormArray {
        return this.collectibleForm.get('triples') as FormArray;
    }

    imagesFormArray(): FormArray {
        return this.collectibleForm.get('images') as FormArray;
    }

    getCategory(): void {
        this.categoryService.get(this.currentCollectible.subcategory?.categoryId)
            .subscribe({
                next: (data) => {
                    this.currentCategory = data;
                    for (let subcat of data.subcategories ? data.subcategories : []) {
                        if (subcat.subcategory == this.currentCollectible.subcategory?.subcategory) {
                            this.currentCollectible.subcategory = subcat;
                        }
                    }
                    this.addQuestions();
                    console.log(data);
                },
                error: (e) => console.error(e)
            });
    }

    addQuestions() {
        for (let question of (this.currentCategory?.questions ? this.currentCategory.questions : [])) {
            let found: boolean = false;
            for (let triple of (this.currentCollectible?.triples ? this.currentCollectible.triples : [])) {
                if (triple.question?.id == question.id) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.currentCollectible.triples?.push(new Triple(question));
            }
        }
        this.buildCollectiblesForm();
    }

    saveCollectible(): void {
        this.copyFormToObject();
        if (this.currentCollectible.id) {
            this.updateCollectible();
        } else {
            this.saveNewCollectible();
        }
    }

    copyFormToObject(): void {
        const collectibleFormModel = this.collectibleForm.value;
        this.currentCollectible.name = collectibleFormModel.name;
        this.currentCollectible.subcategory = collectibleFormModel.subcategory;

        this.currentCollectible.triples = [];
        for (const tripleFormModel of collectibleFormModel.triples) {
            let triple: Triple = new Triple(tripleFormModel.question);
            triple.id = tripleFormModel.id;
            if (triple.question.datatype === 'Date') {
                // Format the date to a string without time.
                triple.value = this.datePipe.transform(tripleFormModel.value, 'dd-MM-yyyy')!;
            } else {
                triple.value = tripleFormModel.value;
            }
            this.currentCollectible.triples.push(triple);
        }

        this.currentCollectible.images = [];
        let counter = 1;
        for (const imageFormModel of collectibleFormModel.images) {
            let image: ImageLink = new ImageLink();
            image.url = imageFormModel.url;
            image.displayOrder = counter;
            this.currentCollectible.images.push(image);
            counter++;
        }
    }

    updateCollectible(): void {
        this.message = '';

        this.collectibleService.update(this.currentCollectible.id, this.currentCollectible)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.submitted = true;
                    this.message = res.message ? res.message : 'This collectible was updated successfully!';
                    this.appComponent.retrieveCategories();
                },
                error: (e) => {
                    this.submitted = true;
                    this.message = e.error.message ? e.error.message : "The request failed for some reason.";
                    console.error(e);
                }
            });
    }

    saveNewCollectible(): void {
        this.collectibleService.create(this.currentCollectible)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.submitted = true;
                    this.message = res.message ? res.message : 'This collectible was saved successfully!';
                    this.currentCollectible.id = res.id;
                    this.appComponent.retrieveCategories();
                },
                error: (e) => {
                    this.submitted = true;
                    this.message = e.error.message ? e.error.message : "The request failed for some reason.";
                    console.error(e);
                }
            });
    }

    newCollectible() {
        this.currentCollectible = {
            name: '',
            images: [new ImageLink()],
            triples: []
        };
        this.addQuestions();
        this.submitted = false;
        this.message = '';
    }

    navigateToDetails() {
        this.router.navigateByUrl('collectible', {state: {collectibleId: this.currentCollectible.id}});
    }

    addNewImage() {
        this.imagesFormArray().push(this.buildImageForm(new ImageLink()));
    }

    removeImage(index: number) {
        this.imagesFormArray().removeAt(index);
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.imagesFormArray().controls, event.previousIndex, event.currentIndex);
        moveItemInArray(this.collectibleForm.value.images, event.previousIndex, event.currentIndex);
    }

    showDatatypeSpecificInput(questiondatatype: string, datatype: string): boolean {
        const implemented: string[] = ['Text', 'Checkbox', 'Date', 'Dropdown'];
        if (!implemented.includes(questiondatatype)) {
            return datatype == 'Text';
        } else {
            return questiondatatype == datatype;
        }
    }
}
