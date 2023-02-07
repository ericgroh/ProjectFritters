import { Choice, Prop, PropType } from 'src/app/shared/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prop',
  templateUrl: './prop.component.html',
  styleUrls: ['./prop.component.scss']
})
export class PropComponent implements OnInit {
  public choice = Choice;
  public propType = PropType
  @Input() prop: Prop;
  @Input() disableBtn: boolean;
  @Output() save = new EventEmitter<Choice>();

  constructor() { }

  select(option: Choice) {
    this.save.emit(option);
  }

  isSelected(option: Choice) {
    return this.prop.answer == option;
  }

  ngOnInit(): void {
  }

}
