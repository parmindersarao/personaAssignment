from dotenv import load_dotenv
import os

load_dotenv()

MODEL_API_KEY = os.getenv("MODEL_API_KEY")
APP_API_KEY =  os.getenv("APP_API_KEY")

if not MODEL_API_KEY:
    raise ValueError("API Key is Missing")

if not APP_API_KEY:
    raise ValueError("App API key is missing ")
    