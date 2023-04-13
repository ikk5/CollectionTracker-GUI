import {Injectable} from '@angular/core';
import {Collectible} from "../models/collectible.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CollectiblesList} from "../models/collectiblesList.model";

const baseUrl = 'http://localhost:8080/api/collectibles'

@Injectable({
  providedIn: 'root'
})
export class CollectibleService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Collectible[]> {
    return this.http.get<Collectible[]>(baseUrl);
  }

  getAllWithSubcategories(subcategories: number[]): Observable<CollectiblesList> {
    return this.http.post<CollectiblesList>(baseUrl + '/list', subcategories); // TODO: change to GET
  }

  get(id: any): Observable<Collectible> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: Collectible): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: Collectible): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: string): Observable<Collectible[]> {
    return this.http.get<Collectible[]>(`${baseUrl}?name=${name}`);
  }
}
