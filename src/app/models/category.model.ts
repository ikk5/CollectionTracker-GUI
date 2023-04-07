import {Subcategory} from "./subcategory.model";
import {Question} from "./question.model";

export class Category {
    id?: any;
    name?: string;
    subcategories?: Subcategory[];
    questions?: Question[];
}