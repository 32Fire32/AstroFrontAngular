import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPersonaleComponent } from './pagina-personale.component';

describe('PaginaPersonaleComponent', () => {
  let component: PaginaPersonaleComponent;
  let fixture: ComponentFixture<PaginaPersonaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPersonaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaPersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
