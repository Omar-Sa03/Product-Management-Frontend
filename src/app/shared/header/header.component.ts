import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() searchChanged = new EventEmitter<string>();
  @Output() mobileMenuToggled = new EventEmitter<void>();

  searchValue: string = '';
  notificationCount: number = 0; 
  isSearching: boolean = false;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(event: any) {
    const query = event.target.value.trim();
    this.searchValue = query;
    
    if (query) {
      this.isSearching = true;
      this.searchSubject.next(query);
    } else {
      this.isSearching = false;
      this.searchChanged.emit('');
    }
  }

  onSearchSubmit() {
    if (this.searchValue.trim()) {
      this.performSearch(this.searchValue.trim());
    }
  }

  clearSearch() {
    this.searchValue = '';
    this.isSearching = false;
    this.searchChanged.emit('');
  }

  private performSearch(query: string) {
    this.isSearching = false;
    this.searchChanged.emit(query);
  }

  onAddPerfume() {
    this.router.navigate(['/add-perfume']);
  }


  updateNotificationCount(count: number) {
    this.notificationCount = count;
  }
}