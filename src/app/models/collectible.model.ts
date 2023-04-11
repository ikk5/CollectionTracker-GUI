import {Subcategory} from "./subcategory.model";
import {ImageLink} from "./image.model";
import {Triple} from "./triple.model";

export class Collectible {
    id?: any;
    name?: string;
    subcategory?: Subcategory;
    addedDate?: string;
    images?: ImageLink[];
    triples?: Triple[];

    constructor() {
        this.name = '';
        this.images = [new ImageLink()];
        this.triples = [];
    }
}
