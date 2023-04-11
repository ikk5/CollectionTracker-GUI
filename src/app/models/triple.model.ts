import {Question} from "./question.model";

export class Triple {
    id?: number;
    question: Question;
    value?: string;

    constructor(question: Question) {
        this.question = question;
        this.value = question.defaultValue;
    }
}