import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectibleComponent } from './add-collectible.component';

describe('AddCollectibleComponent', () => {
  let component: AddCollectibleComponent;
  let fixture: ComponentFixture<AddCollectibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollectibleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCollectibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
