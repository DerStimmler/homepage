import { Component } from '@angular/core';
import { ThemeColor, themeColors } from '../theme-color';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'homepage-theme-selection',
  templateUrl: './theme-selection.component.html',
  styleUrls: ['./theme-selection.component.scss']
})
export class ThemeSelectionComponent {
  darkModeSelected: boolean;
  colors: ThemeColor[] = themeColors;
  selectedColor: ThemeColor = themeColors[0];

  constructor(private themeService: ThemeService) {
    this.darkModeSelected = themeService.loadDarkModeSelection();
    this.selectedColor = themeService.loadColorSelection();
  }

  changeColor(color: ThemeColor) {
    this.selectedColor = color;
    this.themeService.setColor(color);
  }

  changeDarkMode($event: boolean) {
    this.darkModeSelected = $event;
    this.themeService.setDarkMode($event);
  }
}
