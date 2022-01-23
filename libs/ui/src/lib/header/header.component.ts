import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'homepage-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items: MenuItem[] = [
    {
      label: 'Home'
    }
  ];
}
