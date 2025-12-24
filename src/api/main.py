from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from db import get_connection
from dotenv import load_dotenv

import os
import cv2
import base64
import mariadb
from openai import OpenAI
from PIL import ImageGrab
import shutil
from datetime import datetime

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TEMP_DIR = "temp"
os.makedirs(TEMP_DIR, exist_ok=True)

class CompareRequest(BaseModel):
    image: str

@app.get("/api/getdata")
def get_data():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM section_datas")
        rows = cursor.fetchall()

        cursor.close()
        conn.close()

        return rows

    except Exception as err:
        print(err)
        raise HTTPException(status_code=500, detail="Erro ao acessar o banco")
    

@app.get("/api/compareImages")
def compare_images():