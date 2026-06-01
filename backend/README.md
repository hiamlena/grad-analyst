# GradAnalyst Backend

Minimal FastAPI backend for the MVP.

## Run

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

## Check

Open http://127.0.0.1:8000/health

Expected response:

{"status":"ok"}
