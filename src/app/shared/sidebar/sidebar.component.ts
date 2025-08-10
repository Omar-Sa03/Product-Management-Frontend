import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() websiteName: string = 'Arome';
  @Input() logoUrl: string = 'assets/logo.png';
  @Output() logoutClicked = new EventEmitter<void>();

  menuItems = [
    {
      label: 'Perfume Collection',
      route: '',
      icon: 'fas fa-vial'
    },
    {
      label: 'Add Perfume', 
      route: 'add-perfume',
      icon: 'fas fa-plus-circle'
    },
    {
      label: 'About',
      route: 'about',
      icon: 'fa-solid fa-question'
    }
  ];

  constructor(private router: Router) {}

  setActiveItem(index: number) {
    const selectedItem = this.menuItems[index];
    this.router.navigate([selectedItem.route]);
  }

  isActiveRoute(route: string): boolean {
    if (route === '') {
      return this.router.url === '/' || this.router.url === '';
    }
    return this.router.url.includes(route);
  }

  onLogout() {
    this.logoutClicked.emit();
  }
}