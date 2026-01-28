import { Component, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { UpvotesComponent } from '../upvotes/upvotes';

@Component({
  selector: 'comments-item',
  imports: [UpvotesComponent,MatCardModule,MatButtonModule],
  templateUrl: './comments-item.html',
//   styleUrl: './app.css'
})

export class CommentsItemComponent {
   
}
