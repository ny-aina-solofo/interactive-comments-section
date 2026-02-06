from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

# DATABASE_URL = (
#     f"postgresql://{os.getenv('USER_CONNECTION')}:"
#     f"{os.getenv('PASSWORD_CONNECTION')}@"
#     f"{os.getenv('HOST_CONNECTION')}:"
#     f"{os.getenv('PORT_CONNECTION')}/"
#     f"{os.getenv('DATABASE_CONNECTION')}"
# )
DATABASE_URL = "postgresql://postgres:postgres@localhost:5433/comment_db"

engine = create_engine( DATABASE_URL )

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
