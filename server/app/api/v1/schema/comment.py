from pydantic import BaseModel


class UserImage(BaseModel):
    png: str
    webp: str

class UserData(BaseModel):
    image: UserImage
    username: str

class User(BaseModel):
    user_id  = int    
    username = str
    password = str
    avatar = UserImage

class CommentLisResponse(BaseModel):
    comment_id: int
    content: str 
    createdAt: str
    score: int
    user_data : UserData


class ReplyLisResponse(BaseModel):
    comment_id: int
    content: str 
    createdAt: str
    replyingTo: str
    score: int
    user_data : UserData
    comment_id: int



 

