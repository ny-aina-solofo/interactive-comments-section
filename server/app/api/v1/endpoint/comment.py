from fastapi import APIRouter, Depends
from schema.comment import CommentLisResponse
from sqlalchemy.orm import Session
from typing import List
from config.database import get_db
from models.comment import Comment

router = APIRouter(prefix='/comment-api/', tags=['comment-list'])

@router.get('/get-comment', response_model=List[CommentLisResponse], status=200)
def getCommentList(db: Session = Depends(get_db)) :
    comment_list = db.query(Comment).all()
    return comment_list
