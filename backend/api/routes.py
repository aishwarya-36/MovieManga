from fastapi import APIRouter, Query, HTTPException
import httpx
from core.config import OMDB_API_KEY, OMDB_BASE_URL

router = APIRouter()

# main search route 
@router.get("/search-movies")
async def search_movies(
    query: str = Query(..., description="Search query for the movie"),
    page: int = Query(1, ge=1, description="Page number for pagination")
):
    params = {
        "apikey": OMDB_API_KEY,
        "s": query,
        "type": "movie",
        "page": page
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(OMDB_BASE_URL, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch from OMDb API")

    data = response.json()

    if data.get("Response") == "False":
        omdb_results = []
    else:
        omdb_results = data
  
    return omdb_results

# movie details route for individiual
@router.get("/movie-details")
async def get_movie_details(
    imdbID: str = Query(..., description="imdb id for the movie"),
):
    params = {
        "apikey": OMDB_API_KEY,
        "i": imdbID
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(OMDB_BASE_URL, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch from OMDb API")

    data = response.json()

    if data.get("Response") == "False":
        raise HTTPException(status_code=404, detail=data.get("Error", "No results found"))
    else:
        omdb_results = data
    return omdb_results

