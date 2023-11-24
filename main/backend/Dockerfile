FROM  python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

RUN pip install django djangorestframework django-cors-headers gunicorn

WORKDIR /backend

COPY . .

COPY ./entrypoint.sh .

ENTRYPOINT ["sh", "/backend/entrypoint.sh"]