from fastapi import FastAPI
from app.api.v1.endpoint import comment

app = FastAPI()
app.include_router(comment.router)

@app.get("/")
def root():
    return {"message": "app runing"}