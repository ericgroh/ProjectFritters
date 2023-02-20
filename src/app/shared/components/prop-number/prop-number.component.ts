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
  answerFormControl: FormControl;

  constructor() { }

  save() {
    if (!this.disableBtn) {
      this.selected.emit(this.answerFormControl.value);
    }
    else {
      this.answerFormControl.setValue(this.currentAnswer);
      this.answerFormControl.disable();
    }

  }

  getCurrentValue(): number {
    return this.currentAnswer;
  }

  ngOnInit(): void {
    this.answerFormControl = new FormControl({ value: this.currentAnswer, disabled: this.disableBtn })
  }

}
