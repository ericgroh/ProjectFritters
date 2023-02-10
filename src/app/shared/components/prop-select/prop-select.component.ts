import { Choice } from 'src/app/shared/models';
import { Color } from './../../models/color';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prop-select',
  templateUrl: './prop-select.component.html',
  styleUrls: ['./prop-select.component.scss']
})
export class PropSelectComponent implements OnInit {
  colors: Color[] = [
    { value: Choice.None, viewValue: 'none' },
    { value: Choice.GreenYellow, viewValue: 'Green/Yellow' },
    { value: Choice.Orange, viewValue: 'Orange' },
    { value: Choice.Blue, viewValue: 'Blue' },
    { value: Choice.Clear, viewValue: 'Clear' },
    { value: Choice.RedPink, viewValue: 'Red/Pink' },
  ];

  @Input() disableBtn: boolean;
  @Input() selectedChoice: number;
  @Output() selected = new EventEmitter<number>();
  constructor() { }

  select(event: any) {
    console.log("emit: ", event.vaue);
    this.selected.emit(event.value);
  }

  ngOnInit(): void {
  }

}
