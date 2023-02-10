import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropSelectComponent } from './prop-select.component';

describe('PropSelectComponent', () => {
  let component: PropSelectComponent;
  let fixture: ComponentFixture<PropSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
