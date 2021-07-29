import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StallionMintingComponent } from './stallion-minting.component';

describe('StallionMintingComponent', () => {
  let component: StallionMintingComponent;
  let fixture: ComponentFixture<StallionMintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StallionMintingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StallionMintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
