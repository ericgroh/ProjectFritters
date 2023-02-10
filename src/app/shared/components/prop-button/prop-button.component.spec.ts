import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropButtonComponent } from './prop-button.component';

describe('PropButtonComponent', () => {
  let component: PropButtonComponent;
  let fixture: ComponentFixture<PropButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
