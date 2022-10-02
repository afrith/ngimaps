FROM python:3.10-bullseye
RUN set -eux; \
  apt-get update; \
  apt-get install -y --no-install-recommends libgdal-dev; \
  rm -rf /var/lib/apt/lists/*
WORKDIR /code
COPY requirements.txt /code/
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
ENV GDAL_HTTP_MERGE_CONSECUTIVE_RANGES YES
ENV GDAL_DISABLE_READDIR_ON_OPEN EMPTY_DIR
ENV GDAL_CACHEMAX 200
ENV VSI_CACHE TRUE
ENV VSI_CACHE_SIZE 5000000
ENV GDAL_HTTP_MULTIPLEX YES
ENV GDAL_HTTP_VERSION 2
COPY ngi-tiler.py /code/
EXPOSE 80
CMD ["uvicorn", "ngi-tiler:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80"]