export class CollectibleSummary {
    id?: any;
    name: string;
    subcategory: string;
    addedDate?: string;
    questionAnswers: Map<string, string>; // TODO: dit wordt incorrect gemapt naar object na ontvangst

    constructor() {
        this.name = '';
        this.subcategory = '';
        this.questionAnswers = new Map<string, string>();
    }
}