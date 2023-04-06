import {Component, OnInit} from '@angular/core';
import {Collectible} from "../../../models/collectible.model";
import {CollectibleService} from "../../../services/collectible.service";

@Component({
  selector: 'app-add-collectible',
  templateUrl: './add-collectible.component.html',
  styleUrls: ['./add-collectible.component.css']
})
export class AddCollectibleComponent implements OnInit {

  collectible: Collectible = {
    name: '',
    subcategory: undefined
  };
  submitted = false;

  constructor(private collectibleService: CollectibleService) { }

  ngOnInit(): void {
  }

  saveCollectible(): void {
    const data = {
      name: this.collectible.name,
      subcategory: this.collectible.subcategory
    };

    this.collectibleService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e) => console.error(e)
        });
  }

  newCollectible(): void {
    this.submitted = false;
    this.collectible = {
      name: '',
      subcategory: undefined
    };
  }
}
