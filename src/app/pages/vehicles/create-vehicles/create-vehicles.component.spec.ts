import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehiclesComponent } from './create-vehicles.component';

describe('CreateVehiclesComponent', () => {
  let component: CreateVehiclesComponent;
  let fixture: ComponentFixture<CreateVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVehiclesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
