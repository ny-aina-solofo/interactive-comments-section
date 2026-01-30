import { Component, signal } from '@angular/core';
import { CommentListComponent } from './components/comment-list/comment-list';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommentListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('web');
}
