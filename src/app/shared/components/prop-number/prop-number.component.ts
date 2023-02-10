import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-prop-number',
  templateUrl: './prop-number.component.html',
  styleUrls: ['./prop-number.component.scss']
})
export class PropNumberComponent implements OnInit {
  @Input() disableBtn: boolean;
  @Input() currentAnswer: number;
  @Output() selected = new EventEmitter<number>();
  answerFormControl = new FormControl();

  constructor() { }

  save() {
    console.log("emit: ", this.answerFormControl.value);
    this.selected.emit(this.answerFormControl.value);
  }

  getCurrentValue(): number {
    return this.currentAnswer;
  }

  ngOnInit(): void {
    console.log("current answer", this.currentAnswer);
    this.answerFormControl.setValue(this.currentAnswer);
  }

}
