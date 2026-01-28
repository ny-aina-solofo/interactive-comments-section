import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {AddCommentsComponent}  from './components/add-comments/add-comments';
import { CommentsItemComponent } from './components/comments-item/comments-item';
import { ReplyCommentComponent } from './components/reply-comment/reply-comment';

@Component({
  selector: 'app-root',
  imports: [AddCommentsComponent,CommentsItemComponent,ReplyCommentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('web');
}
