from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

class CompareImageRequest(BaseModel):
    clipboard: str
    images: list

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
    

@app.post("/api/compareImages")
async def compare_images(clipedImage: CompareImageRequest):

    ### Nomear melhor as variaveis
    
    # clipedImage = clipedImage.clipboard
    # images = clipedImage.images

    return clipedImage 