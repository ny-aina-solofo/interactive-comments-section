import { Component, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { UpvotesComponent } from '../upvotes/upvotes';

@Component({
  selector: 'reply-comment',
  imports: [UpvotesComponent,MatCardModule,MatButtonModule],
  templateUrl: './reply-comment.html',
//   styleUrl: './app.css'
})

export class ReplyCommentComponent {

}
