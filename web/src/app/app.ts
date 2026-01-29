import { Component, signal } from '@angular/core';
import { CommentsListComponent } from './components/comments-list/comments-list';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommentsListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('web');
}
