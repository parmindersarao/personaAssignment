from fastapi import Header, HTTPException, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.config import APP_API_KEY

limiter = Limiter(key_func=get_remote_address)

def verify_api_key(x_api_key : str = Header(...)):
    if x_api_key != APP_API_KEY:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "Invalid API Key"
        )

