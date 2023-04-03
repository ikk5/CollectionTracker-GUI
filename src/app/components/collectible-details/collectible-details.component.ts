import {Component, Input, OnInit} from '@angular/core';
import {Collectible} from "../../models/collectible.model";
import {CollectibleService} from "../../services/collectible.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-collectible-details',
  templateUrl: './collectible-details.component.html',
  styleUrls: ['./collectible-details.component.css']
})
export class CollectibleDetailsComponent implements OnInit{

  @Input() viewMode = false;
  
  @Input() currentCollectible: Collectible = {
    name: '',
    description: '',
    published: false
  };

  message = '';

  constructor(
      private collectibleService: CollectibleService,
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getCollectible(this.route.snapshot.params["id"]);
    }
  }

  getCollectible(id: string): void {
    this.collectibleService.get(id)
        .subscribe({
          next: (data) => {
            this.currentCollectible = data;
            console.log(data);
          },
          error: (e) => console.error(e)
        });
  }

  updatePublished(status: boolean): void {
    const data = {
      collectible: this.currentCollectible.name,
      description: this.currentCollectible.description,
      published: status
    };

    this.message = '';

    this.collectibleService.update(this.currentCollectible.id, data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.currentCollectible.published = status;
            this.message = res.message ? res.message : 'The status was updated successfully!';
          },
          error: (e) => console.error(e)
        });
  }

  updateCollectible(): void {
    this.message = '';

    this.collectibleService.update(this.currentCollectible.id, this.currentCollectible)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.message = res.message ? res.message : 'This collectible was updated successfully!';
          },
          error: (e) => console.error(e)
        });
  }

  deleteCollectible(): void {
    this.collectibleService.delete(this.currentCollectible.id)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/collectibles']);
          },
          error: (e) => console.error(e)
        });
  }
  
}
