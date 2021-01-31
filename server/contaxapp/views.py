import os.path
from django.shortcuts import render
from django.http import HttpResponse

def render_binary(request, filepath):
  with open(os.path.abspath(os.path.dirname(__file__)) + "/templates/contaxapp/" + filepath, "rb") as f:
    return HttpResponse(f.read(), content_type="image/jpeg")

def index(request):
  return render(request, 'contaxapp/index.html')

def manifest(request):
  return render(request, 'contaxapp/manifest.json')

def asset_manifest(request):
  return render(request, 'contaxapp/asset-manifest.json')

def favicon(request):
  return render_binary(request, 'favicon.ico')

def logo192(request):
  return render_binary(request, 'logo192.png')

def logo512(request):
  return render_binary(request, 'logo512.png')

def robots(request):
  return render(request, 'contaxapp/robots.txt')
