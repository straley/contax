from django.urls import path
from . import views

urlpatterns = [
  path('', views.index),
  path('manifest.json', views.manifest),
  path('asset-manifest.json', views.asset_manifest),
  path('favicon.ico', views.favicon),
  path('logo192.png', views.logo192),
  path('logo512.png', views.logo512),
  path('robots.txt', views.manifest),
]