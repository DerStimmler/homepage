import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'homepage-dark-mode-selection',
  templateUrl: './dark-mode-selection.component.html',
  styleUrls: ['./dark-mode-selection.component.scss']
})
export class DarkModeSelectionComponent {
  @Input() darkModeSelected!: boolean;
  @Output() darkModeSelectedChange = new EventEmitter<boolean>();

  changeDarkMode($event: boolean) {
    this.darkModeSelectedChange.emit($event);
  }
}
