import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeColor, themeColors, themes } from './theme-color';
import { Color } from './color';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeColorKey = 'themeColor';
  private darkModeKey = 'darkMode';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private static getRandomThemeColor(): ThemeColor {
    return themeColors.filter(c => c.name !== Color.Random)[Math.floor(Math.random() * (themeColors.length - 1))];
  }

  private static getBackupThemeColor(): ThemeColor {
    const backupColor = themeColors.find(c => c.name === Color.Random);

    if (!backupColor) {
      return ThemeService.getRandomThemeColor();
    }

    return backupColor;
  }

  loadColorSelection(): ThemeColor {
    const color = localStorage.getItem(this.themeColorKey);

    if (color === null) {
      const backupColor = ThemeService.getBackupThemeColor();

      this.saveColorSelection(backupColor);
      return backupColor;
    }

    const themeColor = themeColors.find(c => c.name === color);

    if (!themeColor) {
      const backupColor = ThemeService.getBackupThemeColor();

      this.saveColorSelection(backupColor);
      return backupColor;
    }

    return themeColor;
  }

  loadDarkModeSelection(): boolean {
    const darkMode = localStorage.getItem(this.darkModeKey);

    if (darkMode === null) {
      this.saveDarkModeSelection(true);
      return true;
    }

    return JSON.parse(darkMode);
  }

  selectColor(themeColor: ThemeColor): void {
    this.saveColorSelection(themeColor);

    this.setTheme(themeColor, this.loadDarkModeSelection());
  }

  setDarkMode(darkMode: boolean): void {
    this.saveDarkModeSelection(darkMode);

    this.setTheme(this.loadColorSelection(), darkMode);
  }

  applyCurrentTheme(): void {
    this.setTheme(this.loadColorSelection(), this.loadDarkModeSelection());
  }

  private saveDarkModeSelection(darkMode: boolean): void {
    localStorage.setItem(this.darkModeKey, darkMode.toString());
  }

  private setTheme(themeColor: ThemeColor, darkMode: boolean): void {
    if (themeColor.name === Color.Random) {
      themeColor = ThemeService.getRandomThemeColor();
    }

    const theme = themes.find(t => t.color === themeColor.name && t.darkMode === darkMode);

    if (theme) {
      const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

      if (themeLink) {
        themeLink.href = theme.name + '.css';
      }
    }
  }

  private saveColorSelection(color: ThemeColor): void {
    localStorage.setItem(this.themeColorKey, color.name);
  }
}
