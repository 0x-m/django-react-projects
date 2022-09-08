# Introduction
**Notes** is a simple note keeping web application made with Django and React.js

There are two general approaches to building web applications today:
**Traditional web application** and **Single Page Application(SPA)**, in this project I've tried to illustrate these two approaches by building a note app in both ways.

## Step One
Firstly, I've created the note app solely in Django with the following capabilities:

1. The app has two models **Note** and **Tag**.
2. Each note has a title and body and may have any number of tags. 
3. Users can **add, edit or delete** their notes and also **add or delete** their tags.
4. Each tag has a name that is unique among all user's tags (Thus, Two different users can have tags with the same name)
5. Users can search for a note and also filter their notes based on tags.
6. The app has Signup and Login pages and a decent dashboard for managing the notes and tags.

## Step Two

In the second step, I've used **Django REST framework** to develop a set of RESTful API endpoints for the user authentication and managing notes and tags.

The API has the following specs:

1. JWT for authentication (authorization)
2. Authentication via some social media account (Gmail for example)
3. Good documentation and schema.

The API schema is as follows:

    - /api/v1/users/registration (POST: register a new user)
    - /api/v1/token/ (POST: obtain a set of new Access and Refresh tokens)
    - /api/v1/token/refresh (POST: obtain a new Access token) 
    - /api/v1/notes  (POST: Create a new note, GET: get the list of all user's notes (paginated))
    - /api/v1/notes/<note_id> (DELETE: delete the note with id=note_id, PUT: Update the note)
    - /api/v1/tags (POST: Create a new tag, GET: get the list of all user's tags)
    - /api/v1/tags/<tag_id> (DELETE: delete the tag with id=tag_id, PUT: Update the tag)




# Technologies

- Backend: Python Django + DRF, SQLite Postgresql
- Frontend: React.js, tailwindcss
- Deployment: Gunicorn Heroku  Docker, Docker compose
- Other utilities:
    - **Open Schema**: API Automatic schema generator
    - **spectacular** : API Automatic document generator
    - **spinx**: for project documentation
    - **mypy**: for static type checking.
    - **pylint/black**: python linter and style guide enforcement.
    - **django_silk**: A library for profiling Django apps.
    - **venv**: for virtual environment.
    - **white_noise**: for serving static files.
    - **simple_jwt** : for implementing JWT Authentication
    - **allauth**: for social media authentication
    - **django_filters** : for implementing model filtering
    - **django-corsheaders**: CORS header manager
    - **pre-commit**


# Installation
- First approach:
    - Clone the repository:
        git clone ..
    - use toml file to create virtual env
    - install requirements:
        for development:
            pip install -r requirements/dev.txt
        for proudction:
            pip install -r requirements/prod.txt
    4) start the app:
        python  manage.py runserver

- Second approach:


# Contribute


# License