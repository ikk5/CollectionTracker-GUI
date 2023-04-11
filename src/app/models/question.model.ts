export class Question {
    id?: number;
    question?: string;
    datatype: string = 'Text';
    defaultValue?: string;
    hidden: boolean = false;
    listColumn: boolean = false;
}