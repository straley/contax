# Project Initialization
```
# create environment
python3 -m venv env-contax-server
source env-contax-server/bin/activate

# install packages
pip install --upgrade pip
pip install django
pip install djangorestframework
pip install markdown
pip install django-filter
pip install django-cors-headers

# create app and initialize
django-admin startproject api
cd api
python manage.py startapp contax-api
python manage.py createsuperuser

# when models are created or updated
python manage.py makemigrations
python manage.py migrate
```

