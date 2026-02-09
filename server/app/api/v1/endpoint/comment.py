from fastapi import APIRouter, Depends, HTTPException, status
from app.api.v1.schema.comment import CommentListResponse, CommentCreate,ReplyCreate
from app.api.v1.schema.user import UserList
from sqlalchemy.orm import Session
from typing import List
from app.config.database import get_db
from app.models.comment import Comment,Reply,User
from datetime import datetime

router = APIRouter(prefix='/comment-api', tags=['comment-list'])

@router.get('/get-comment', response_model=List[CommentListResponse], status_code=200)
def getCommentList(db: Session = Depends(get_db)) :
    data = []
    comments = db.query(Comment).all()
    if not comments :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='comment not found'
        )
    
    replies = db.query(Reply).all()
    if not replies :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='reply not found'
        )
    
    
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


@router.post("/add-comment", status_code=200)
def add_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    new_comment = Comment(
        content=comment.content,
        created_at=str(datetime.now()),
        score=0,
        user_data=comment.user_data.model_dump()
    )
    if not new_comment :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Error inserting comment data'
        )
    
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return {"success":True}

@router.post("/add-reply", status_code=200)
def add_reply(reply: ReplyCreate, db: Session = Depends(get_db)):
    new_reply = Reply(
        content=reply.content,
        created_at=str(datetime.now()),
        replyingto=reply.replyingto,
        score=0,
        user_data=reply.user_data.model_dump(),
        comment_id=reply.comment_id
    )
    if not new_reply :
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Error inserting reply data'
        )
    
    db.add(new_reply)
    db.commit()
    db.refresh(new_reply)
    return {"success":True}