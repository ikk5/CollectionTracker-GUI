import {Subcategory} from "./subcategory.model";
import {ImageLink} from "./image.model";

export class Collectible {
    id?: any;
    name?: string;
    subcategory?: Subcategory;
    addedDate?: string;
    images?: ImageLink[];

    constructor() {
        this.name = '';
        this.images = [new ImageLink()];
    }
}
