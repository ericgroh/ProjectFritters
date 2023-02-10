import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSheetComponent } from './join-sheet.component';

describe('JoinSheetComponent', () => {
  let component: JoinSheetComponent;
  let fixture: ComponentFixture<JoinSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
