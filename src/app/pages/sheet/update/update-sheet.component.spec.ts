import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSheetComponent } from './update-sheet.component';

describe('UpdateSheetComponent', () => {
  let component: UpdateSheetComponent;
  let fixture: ComponentFixture<UpdateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
