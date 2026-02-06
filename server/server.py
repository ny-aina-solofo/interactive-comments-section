from fastapi import FastAPI
from app.api.v1.endpoint import comment
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI( 
    title="interactive-comment-setcion API",
    description="API that requires a Bearer token",
    version="1.0",
    # openapi_security=[{
    #     "bearerAuth": {
    #         "type": "http",
    #         "scheme": "bearer",
    #         "bearerFormat": "JWT"
    #     }
    # }]
)
origins = [
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(comment.router)

if __name__ == "__main__":
    uvicorn.run("server:app", host='0.0.0.0', port=3000, reload=True)
