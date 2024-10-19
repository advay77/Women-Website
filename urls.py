from django.urls import path
from . import views

urlpatterns = [
    path('emergency_alert/', views.emergency_alert, name='emergency_alert'),
    path('find_nearby_places/', views.find_nearby_places, name='find_nearby_places'),
]

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('safety/', include('safety.urls')),
]
