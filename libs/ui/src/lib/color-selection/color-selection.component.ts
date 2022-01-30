import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeColor } from '../theme-color';
import { Color } from '../color';

@Component({
  selector: 'homepage-color-selection',
  templateUrl: './color-selection.component.html',
  styleUrls: ['./color-selection.component.scss']
})
export class ColorSelectionComponent {
  @Input() colors!: ThemeColor[];
  @Input() selectedColor!: ThemeColor;
  @Output() selectedColorChange = new EventEmitter<ThemeColor>();

  Color = Color;

  selectColor(color: ThemeColor) {
    this.selectedColorChange.emit(color);
  }
}
