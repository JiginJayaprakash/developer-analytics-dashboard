# developer-analytics-dashboard

## Info

/api/visit/4 -  4 is the user_id

/api/random/80 - to generate random 80 records with random dates within last 30 days and random user_Id between 1 and 100

/api/rest/data/ - show all Db records

/api/search/ -  show top 10 indexed records

For viewing more indexed result please check https://django-elasticsearch-dsl-drf.readthedocs.io/en/latest/index.html



## How to run with docker

```
cd main
docker-compose build
docker-compose up
```

## How to run backend 

```
cd main/backend
pip install -r requirements.txt
python manage.py runserver
```

## How to run frontend 
```
cd main/frontend
npm install
npm start
```


## Making any changes

*If adding new packages to backend then run*

```
pip freeze > requirements.txt
```

*If want to reindex documents*

```
python manage.py search_index --rebuild -f
```
*If want to delete all data*

```
python manage.py flush
```





