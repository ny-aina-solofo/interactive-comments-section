from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Text, ForeignKey,JSON
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    __table_args__ = {"schema": "comment"}

    user_id  = Column(Integer, primary_key=True, index=True)    
    username = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    avatar = Column(JSON)

class Comment(Base):
    __tablename__ = "comments"
    __table_args__ = {"schema": "comment"}

    comment_id  = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(String, nullable=False)
    score = Column(Integer, nullable=False, default=0)
    user_data = Column(JSON, nullable=False)
    replies = relationship("Reply", back_populates="comments")


class Reply(Base):
    __tablename__ = "replies"
    __table_args__ = {"schema": "comment"}

    reply_id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    created_at = Column(String, nullable=False)
    replyingto  = Column(String, nullable=False)
    score = Column(Integer, nullable=False, default=0)
    user_data = Column(JSON, nullable=False)
    comment_id = Column(Integer, ForeignKey("comment.comments.comment_id"))
    comments = relationship("Comment", back_populates="replies")

