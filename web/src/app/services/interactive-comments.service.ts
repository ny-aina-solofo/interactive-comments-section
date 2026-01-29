import { Injectable, signal } from '@angular/core';
import * as data from './data.json';
import { Comment } from '../models/comments';

const  STORAGE_KEY = "interactive-comments";

@Injectable({
  providedIn: 'root',
})

  
export class InteractiveCommentsService {
  
  comments_data :Comment[];
  
  constructor(){
    const stored = localStorage.getItem(STORAGE_KEY);

    this.comments_data = stored
      ? JSON.parse(stored)
      : data.comments;
  }
  

  getCommentsList() {
    return this.comments_data;
  }


  addComments(text:string) {
    const newComment = {
      id: Date.now(),
      content: text,
      createdAt: new Date().toISOString(),
      score: 0,
      user: data.currentUser,
      replies:[]
    };
    this.comments_data.push(newComment);
    return this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.comments_data))
    return this.getCommentsList();
  }
  
}
