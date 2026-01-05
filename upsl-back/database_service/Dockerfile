FROM python:3.11-slim

# системні залежності
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# requirements
COPY database_service/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 2️⃣ shared utils
COPY shared_utils /shared_utils
RUN pip install -e /shared_utils

# код
COPY database_service .

# щоб Alembic бачив app
ENV PYTHONPATH=/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
