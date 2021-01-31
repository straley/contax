#!/bin/bash

source env-contax-server/bin/activate
python manage.py runserver
deactivate
