from fastapi import FastAPI, Query, HTTPException
from enum import Enum
from titiler.mosaic.factory import MosaicTilerFactory
from titiler.core.errors import DEFAULT_STATUS_CODES, add_exception_handlers
from titiler.mosaic.errors import MOSAIC_STATUS_CODES
import os

app = FastAPI(
    title = "NGI Map Tiler",
    description="Tileserver for NGI-derived map tiles"
)

def Defaults():
  return {}

class LayerType(str, Enum):
  fiftyk = "50k"

layerUrls = {
  LayerType.fiftyk: os.environ.get('FIFTYK_MOSAIC_URL', 'http://localhost:8080/mosaic.json')
}

def PathParams(
    layer: LayerType = Query(..., description="Data layer to use")
  ) -> str:
    return layerUrls[layer]

mosaic = MosaicTilerFactory(
  path_dependency=PathParams,
  layer_dependency=Defaults,
  dataset_dependency=lambda: {"resampling_method": "lanczos"},
  process_dependency=Defaults,
  render_dependency=Defaults,
  colormap_dependency=Defaults
)
app.include_router(mosaic.router, prefix="/tiler", tags=["Tiles"])
add_exception_handlers(app, DEFAULT_STATUS_CODES)
add_exception_handlers(app, MOSAIC_STATUS_CODES)