from fastapi import APIRouter, Depends
from app.api.v1.schema.comment import CommentLisResponse
from app.api.v1.schema.user import UserList
from sqlalchemy.orm import Session
from typing import List
from app.config.database import get_db
from app.models.comment import Comment,Reply,User

router = APIRouter(prefix='/comment-api', tags=['comment-list'])

@router.get('/get-comment', response_model=List[CommentLisResponse], status_code=200)
def getCommentList(db: Session = Depends(get_db)) :
    data = []
    comments = db.query(Comment).all()
    replies = db.query(Reply).all()

    for comment in comments:
        reply_data = [
            {
                "reply_id": reply.reply_id,
                "content": reply.content,
                "created_at": reply.created_at,
                "replyingto": reply.replyingto,
                "score": reply.score,
                "user_data": reply.user_data,
                "comment_id": reply.comment_id,
            }
            for reply in replies
            if reply.comment_id == comment.comment_id
        ]

        data.append({
            "comment_id": comment.comment_id,
            "content": comment.content,
            "created_at": comment.created_at,
            "score": comment.score,
            "user_data": comment.user_data,
            "replies": reply_data
        })

    return data

@router.get('/get-user', response_model=List[UserList], status_code=200)
def getUserList(db: Session = Depends(get_db)) :  
    users = db.query(User).all()
    return users