from pydantic import BaseModel

class UserImage(BaseModel):
    png: str
    webp: str

class UserData(BaseModel):
    image: UserImage
    username: str
    model_config = {"from_attributes": True}

class UserList(BaseModel):
    user_id: int    
    username: str
    password: str
    avatar: UserImage
    model_config = {"from_attributes": True}
