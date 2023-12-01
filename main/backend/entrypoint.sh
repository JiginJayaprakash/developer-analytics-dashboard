python manage.py makemigrations
python manage.py migrate --no-input


python manage.py search_index --rebuild -f && gunicorn backend.wsgi:application --bind 0.0.0.0:8000