from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet
from .auth_views import RegisterView, CustomAuthToken, UserView

router = DefaultRouter()
router.register(r'posts', BlogPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
]