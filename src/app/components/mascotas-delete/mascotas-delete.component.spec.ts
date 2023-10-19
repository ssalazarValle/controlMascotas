import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasDeleteComponent } from './mascotas-delete.component';

describe('MascotasDeleteComponent', () => {
  let component: MascotasDeleteComponent;
  let fixture: ComponentFixture<MascotasDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MascotasDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
