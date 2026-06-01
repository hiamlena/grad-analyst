from fastapi import FastAPI

from app.routes.health import router as health_router


app = FastAPI(
    title="ГрадоАналитик API",
    description="Backend для MVP предпроектного анализа земельных участков",
    version="0.1.0",
)

app.include_router(health_router)
