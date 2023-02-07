import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prop-button',
  templateUrl: './prop-button.component.html',
  styleUrls: ['./prop-button.component.scss']
})
export class PropButtonComponent implements OnInit {
  @Input() btnText: string;
  @Input() disableBtn: boolean;
  @Input() isSelected: boolean;
  @Output() selected = new EventEmitter<boolean>();
  constructor() { }

  select() {
    console.log("emit");
    this.selected.emit(true);
  }

  ngOnInit(): void {
  }

}
