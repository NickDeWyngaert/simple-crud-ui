import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFormNewComponent } from './movie-form-new.component';

describe('MovieFormNewComponent', () => {
  let component: MovieFormNewComponent;
  let fixture: ComponentFixture<MovieFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieFormNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
