import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectibleDetailsComponent } from './collectible-details.component';

describe('CollectibleDetailsComponent', () => {
  let component: CollectibleDetailsComponent;
  let fixture: ComponentFixture<CollectibleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectibleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectibleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
