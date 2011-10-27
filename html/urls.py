from django.conf.urls.defaults import *

urlpatterns = patterns('',
    (r'^$', 'views.index'),
    (r'^json/$', 'views.json_request'),
    (r'^media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': 'media/','show_indexes': False}),
    (r'^favicon.ico$', 'django.views.static.serve', 
        {'document_root': '/var/www/html/www.unshort.ru/html/media/', 'path': "favicon.ico"}),

)
