FROM  python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

RUN mkdir /app

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

COPY ./entrypoint.sh .

ENTRYPOINT ["sh", "/backend/entrypoint.sh"]