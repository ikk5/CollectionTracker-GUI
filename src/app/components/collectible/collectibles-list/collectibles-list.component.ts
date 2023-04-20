import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CollectibleService} from "../../../services/collectible.service";
import {Category} from "../../../models/category.model";
import {Router} from "@angular/router";
import {Subcategory} from "../../../models/subcategory.model";
import {CollectiblesList} from "../../../models/collectiblesList.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
    selector: 'app-collectibles-list',
    templateUrl: './collectibles-list.component.html',
    styleUrls: ['./collectibles-list.component.css']
})
export class CollectiblesListComponent implements OnInit, AfterViewInit {

    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns?: string[];
    tabledata: MatTableDataSource<Map<string, string>> = new MatTableDataSource<Map<string, string>>();
    filterSelectObj: any[] = [];
    filterValues: any = {};

    collectibles?: CollectiblesList;
    category?: Category;
    subcategory?: Subcategory;

    constructor(private collectibleService: CollectibleService,
                private router: Router) {
        this.category = history.state.category;
        this.subcategory = history.state.subcategory;
        router.routeReuseStrategy.shouldReuseRoute = function () { // TODO: deprecated; find alternative
            return false;
        }
    }

    ngOnInit(): void {
        this.retrieveCollectibles();

        this.tabledata.filterPredicate = this.createFilter();
    }

    ngAfterViewInit(): void {
        this.tabledata.sort = this.sort;
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
                },
                error: (e) => console.error(e)
            });
    }

    initTableData() {
        this.displayedColumns = [];
        let data: Map<string, string>[] = [];

        this.displayedColumns.push('Name');
        this.displayedColumns.push('Subcategory');

        for (let question of (this.collectibles?.questions ? this.collectibles.questions : [])) {
            if (question.listColumn) { // TODO: hidden check
                this.displayedColumns.push(question.question);
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
        this.tabledata.data = data;

        // Init table filters
        this.filterSelectObj = [];
        for (let column of this.displayedColumns) {
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
        this.router.navigateByUrl('collectible', {state: {collectibleId: row.get('id')}});
    }

    // applyFilter(event: Event): void {
    //     const filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    //     this.tabledata.filter = filter;
    //     if (this.tabledata.paginator) {
    //         this.tabledata.paginator.firstPage();
    //     }
    // }

    // Get unique values for the column filters.
    getFilterObject(fullObj: Map<string, string>[], key: string) {
        const uniqChk: any[] = [];
        fullObj.filter((obj: Map<string, string>) => {
            if (!uniqChk.includes(obj.get(key))) {
                uniqChk.push(obj.get(key));
            }
            return obj;
        });
        return uniqChk;
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
                for (const col in searchTerms) {
                    searchTerms[col].trim().toLowerCase().split(' ').forEach((word: string) => {
                        if ((data.get(col).toString().toLowerCase().indexOf(word) != -1 && word !== '')
                            || data.get(col).toString() === word
                            || (!data.get(col) && word === '')) {
                            found = true
                        }
                    });
                }
                return found
            }
            return nameSearch()
        }
    }

    resetFilters() {
        this.filterValues = {}
        this.filterSelectObj.forEach((value, key) => {
            value.modelValue = undefined;
        })
        this.tabledata.filter = "";
    }
}