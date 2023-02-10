import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropNumberComponent } from './prop-number.component';

describe('PropNumberComponent', () => {
  let component: PropNumberComponent;
  let fixture: ComponentFixture<PropNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
