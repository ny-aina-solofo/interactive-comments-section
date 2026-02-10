from pydantic import BaseModel
from typing import List
from app.api.v1.schema.user import UserData

class ReplyListResponse(BaseModel):
    reply_id: int
    content: str 
    created_at: str
    replyingto: str
    score: int
    user_data : UserData
    comment_id: int

class CommentListResponse(BaseModel):
    comment_id: int
    content: str 
    created_at: str
    score: int
    user_data : UserData
    replies : List[ReplyListResponse]


class CommentCreate(BaseModel):
    content: str
    user_data: UserData 

class ReplyCreate(BaseModel):
    content: str
    replyingto: str
    user_data: UserData
    comment_id: int 

class CommentEdit(BaseModel) : 
    content: str

class ReplyEdit(BaseModel) : 
    content: str