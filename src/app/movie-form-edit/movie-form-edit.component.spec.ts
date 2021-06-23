import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFormEditComponent } from './movie-form-edit.component';

describe('MovieFormEditComponent', () => {
  let component: MovieFormEditComponent;
  let fixture: ComponentFixture<MovieFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieFormEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
