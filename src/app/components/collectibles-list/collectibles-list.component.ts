import {Component, OnInit} from '@angular/core';
import {Collectible} from "../../models/collectible.model";
import {CollectibleService} from "../../services/collectible.service";

@Component({
  selector: 'app-collectibles-list',
  templateUrl: './collectibles-list.component.html',
  styleUrls: ['./collectibles-list.component.css']
})
export class CollectiblesListComponent  implements OnInit {

  collectibles?: Collectible[];
  currentCollectible: Collectible = {};
  currentIndex = -1;
  title = '';

  constructor(private collectibleService: CollectibleService) { }

  ngOnInit(): void {
    this.retrieveCollectibles();
  }

  retrieveCollectibles(): void {
    this.collectibleService.getAll()
        .subscribe({
          next: (data) => {
            this.collectibles = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
  }

  refreshList(): void {
    this.retrieveCollectibles();
    this.currentCollectible = {};
    this.currentIndex = -1;
  }

  setActiveCollectible(collectible: Collectible, index: number): void {
    this.currentCollectible = collectible;
    this.currentIndex = index;
  }

  removeAllCollectibles(): void {
    this.collectibleService.deleteAll()
        .subscribe({
          next: (res) => {
            console.log(res);
            this.refreshList();
          },
          error: (e) => console.error(e)
        });
  }

  searchName(): void {
    this.currentCollectible = {};
    this.currentIndex = -1;

    this.collectibleService.findByName(this.title)
        .subscribe({
          next: (data) => {
            this.collectibles = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
  }

}
