import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CollectibleService} from "../../../services/collectible.service";
import {Category} from "../../../models/category.model";
import {Router} from "@angular/router";
import {Subcategory} from "../../../models/subcategory.model";
import {CollectiblesList} from "../../../models/collectiblesList.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {StorageService} from "../../../services/storage.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'app-collectibles-list',
    templateUrl: './collectibles-list.component.html',
    styleUrls: ['./collectibles-list.component.css']
})
export class CollectiblesListComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('paginator') paginator!: MatPaginator;

    displayedColumns?: string[];
    tabledata: MatTableDataSource<Map<string, string>> = new MatTableDataSource<Map<string, string>>();
    filterSelectObj: any[] = [];
    filterValues: any = {};
    searchValue: string = '';
    showHidden: boolean = false;
    doneLoading: boolean = false;

    collectibles?: CollectiblesList;
    category?: Category;
    subcategory?: Subcategory;

    constructor(private collectibleService: CollectibleService,
                private router: Router,
                private storageService: StorageService) {
        this.category = history.state.category;
        this.subcategory = history.state.subcategory;
        router.routeReuseStrategy.shouldReuseRoute = function () { // TODO: deprecated; find alternative
            return false;
        }
    }

    ngOnInit(): void {
        if (this.subcategory) {
            this.showHidden = this.subcategory?.username == this.storageService.getUser().username;
        } else if (this.category?.subcategories) {
            this.showHidden = this.category.subcategories[0].username == this.storageService.getUser().username;
        }

        this.retrieveCollectibles();
    }

    ngAfterViewInit(): void {
        this.tabledata.sort = this.sort;
        this.tabledata.paginator = this.paginator;
        this.tabledata.filterPredicate = this.createFilter();

        this.tabledata.sortData = (data, sort) => {
            const isAsc = sort.direction === 'asc';
            return data.sort((a: Map<string, string>, b: Map<string, string>) => {
                return this.compare(a.get(sort.active)!, b.get(sort.active)!, isAsc);
            });
        }
    }

    compare(a: number | string | Date, b: number | string | Date, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    retrieveCollectibles(): void {
        let ids: number[] = [];
        if (this.category) {
            this.category.subcategories?.forEach(value => ids.push(value.subcategoryId));
        } else {
            ids.push(this.subcategory?.subcategoryId);
        }

        this.collectibleService.getAllWithSubcategories(ids)
            .subscribe({
                next: (data) => {
                    console.log(data);
                    this.collectibles = data;
                    this.initTableData();
                    this.doneLoading = true;
                },
                error: (e) => console.error(e)
            });
    }

    initTableData() {
        this.displayedColumns = ['Name'];
        let data: Map<string, string>[] = [];
        let filterColumns: string[] = ['Name'];

        if (this.category) {
            this.displayedColumns.push('Subcategory');
            filterColumns.push('Subcategory');
        }

        for (let question of (this.collectibles?.questions ? this.collectibles.questions : [])) {
            if (question.listColumn && (!question.hidden || (question.hidden && this.showHidden))) {
                this.displayedColumns.push(question.question);
                if (question.filterColumn) {
                    filterColumns.push(question.question);
                }
            }
        }
        console.log(this.displayedColumns);

        for (let summary of (this.collectibles?.collectibleSummaries ? this.collectibles.collectibleSummaries : [])) {
            let map: Map<string, string> = new Map<string, string>();
            for (let column of this.displayedColumns) {
                let value: string = '';
                const actualMap = new Map<string, string>(Object.entries(summary.questionAnswers));
                if (actualMap.size > 0) {
                    value = (actualMap.get(column) ? actualMap.get(column) : '')!;
                }
                map.set(column, value);
            }
            map.set('id', summary.id); // Isn't shown but used for navigation
            map.set('Name', summary.name);
            map.set('Subcategory', summary.subcategory);
            data.push(map);
        }

        this.initTableFilters(filterColumns, data);
        this.tabledata.data = data;
    }

    initTableFilters(filterColumns: string[], data: Map<string, string>[]) {
        this.filterSelectObj = [];
        for (let column of filterColumns) {
            if (column !== 'Name') {
                this.filterSelectObj.push(
                    {
                        name: column,
                        columnProp: column,
                        options: []
                    }
                );
            }
        }

        this.filterSelectObj.filter((o) => {
            o.options = this.getFilterObject(data, o.columnProp);
        });
    }

    openCollectible(row: Map<string, string>) {
        console.log('clicked: ' + row.get('id'));
        const id = row.get('id');
        window.open('collectible/' + id);
        // this.router.navigateByUrl('collectible/' + id); TODO: make this a user setting
    }

    applyFilter(event: Event): void {
        const search = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
        if (search.length > 1) {
            this.filterValues['Name'] = search;
            this.tabledata.filter = JSON.stringify(this.filterValues);
            if (this.tabledata.paginator) {
                this.tabledata.paginator.firstPage();
            }
        }
    }

    // Get unique values for the column filters.
    getFilterObject(fullObj: Map<string, string>[], key: string) {
        const uniqChk: any[] = [];
        fullObj.filter((obj: Map<string, string>) => {
            if (!uniqChk.includes(obj.get(key))) {
                uniqChk.push(obj.get(key));
            }
            return obj;
        });
        return uniqChk.sort((a, b) => this.compare(a, b, true));
    }

    filterChange(filter: any, event: any) {
        this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
        this.tabledata.filter = JSON.stringify(this.filterValues)
    }

    createFilter() {
        return function (data: any, filter: string): boolean {
            let searchTerms = JSON.parse(filter);

            console.log(searchTerms);

            let nameSearch = () => {
                let found = false;
                let anyFalse = false;
                for (const col in searchTerms) {
                    searchTerms[col].trim().toLowerCase().split(' ').forEach((word: string) => {
                        if (!anyFalse && (
                            (data.get(col).toString().toLowerCase().indexOf(word) != -1 && word !== '')
                            || data.get(col).toString() === word
                            || (!data.get(col) && word === '')
                        )) {
                            found = true
                        } else {
                            found = false;
                            anyFalse = true;
                        }
                    });
                }
                return found
            }
            return nameSearch()
        }
    }

    resetFilters() {
        this.searchValue = '';
        this.filterValues = {}
        this.filterSelectObj.forEach((value, key) => {
            value.modelValue = undefined;
        })
        this.tabledata.filter = "";
    }
}