from pydantic import BaseModel
from typing import List
from app.api.v1.schema.user import UserData

class ReplyLisResponse(BaseModel):
    reply_id: int
    content: str 
    created_at: str
    replyingto: str
    score: int
    user_data : UserData
    comment_id: int

class CommentLisResponse(BaseModel):
    comment_id: int
    content: str 
    created_at: str
    score: int
    user_data : UserData
    replies : List[ReplyLisResponse]




 

