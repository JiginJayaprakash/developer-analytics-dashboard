# developer-analytics-dashboard

## Info

Click on cards to see the filter


## How to run with docker

```
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
python manage.py search_index --rebuild
```



