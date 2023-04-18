import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category.model";

const baseUrl = 'http://localhost:8080/api/'
const categoriesUrl = baseUrl + 'categories'

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(categoriesUrl);
    }

    getAllForUser(username: any): Observable<Category[]> {
        return this.http.get<Category[]>(`${categoriesUrl}?username=${username}`);
    }

    get(id: any): Observable<Category> {
        return this.http.get(`${categoriesUrl}/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(categoriesUrl, data);
    }

    update(id: any, data: any): Observable<any> {
        return this.http.put(`${categoriesUrl}/${id}`, data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${categoriesUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(categoriesUrl);
    }

    getAllDatatypes(): Observable<string[]> {
        return this.http.get<string[]>(baseUrl + 'datatypes');
    }
}
