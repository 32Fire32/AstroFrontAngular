import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociazioneComponent } from './associazione.component';

describe('AssociazioneComponent', () => {
  let component: AssociazioneComponent;
  let fixture: ComponentFixture<AssociazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociazioneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
