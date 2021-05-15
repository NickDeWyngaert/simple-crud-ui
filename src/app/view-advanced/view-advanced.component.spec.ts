import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdvancedComponent } from './view-advanced.component';

describe('ViewAdvancedComponent', () => {
  let component: ViewAdvancedComponent;
  let fixture: ComponentFixture<ViewAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdvancedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
