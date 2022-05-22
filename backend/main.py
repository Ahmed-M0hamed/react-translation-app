import functools
from operator import imod
from fastapi import FastAPI , UploadFile ,File 
from fastapi.middleware.cors import CORSMiddleware 
import tensorflow as tf 
from  gtts import gTTS 
import os 
from transformers import pipeline

en_fr_translator = pipeline("translation_en_to_fr")

app = FastAPI()
origins =  ['http://localhost:3000'] 

app.add_middleware(
    CORSMiddleware ,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/') 
def say_hello() :
    return 'hello'

@app.post('/translate/') 
async def translate(input:dict) :
    saving_path = '../frontend/src/translation.mp3' 
    input_text = dict(input) 
    translation_text = en_fr_translator(input_text['input_text']) 
    language = 'fr' 
    output_text = translation_text[0]['translation_text']
    myobj = gTTS(text=output_text, lang=language, slow=False) 
    myobj.save(saving_path)
    return   output_text  
