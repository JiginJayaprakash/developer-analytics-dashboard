python manage.py makemigrations
python manage.py migrate --no-input



gunicorn backend.wsgi:application --bind 0.0.0.0:8000