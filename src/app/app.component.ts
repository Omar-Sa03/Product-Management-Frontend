import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product Management';
  private _search$ = new BehaviorSubject<string>('');
  search$ = this._search$.asObservable();

  onSearchChanged(term: string) {
    this._search$.next(term.trim().toLowerCase());
  }
}
