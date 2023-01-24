import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropDialogComponent } from './prop-dialog.component';

describe('PropDialogComponent', () => {
  let component: PropDialogComponent;
  let fixture: ComponentFixture<PropDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
