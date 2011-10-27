from decorators import render_to
from django.http import HttpResponse
import json, urllib2 
from url.models import Url, Malware
from urlparse import urlparse
from safebrowsing.query_lookup import Lookup

look = Lookup()

def check_url(request):
    response = False
    redirect = None
    if 'url' in request.GET:
        url = request.GET['url']
        if url:
            try:
                urlobj = Url.objects.get(src = url)
                redirect = urlobj.redirect
            except Url.DoesNotExist or not urlobj:
                try:
                    res = urllib2.urlopen(url)
                    redirect = res.geturl()
                    urlobj = Url(src=url, redirect=redirect)
                    urlobj.save()
                except Exception:
                    response = {'result': 'false'}
            if redirect and redirect != url:
                alerts = 'no'
                if urlobj.alerts:
                    alerts = 'yes'
                else:
                    urlparts = urlparse(redirect)
                    hostname = urlparts.hostname
                    try:
                        malw = Malware.objects.get(pk=hostname)
                        if malw:
                            alerts = 'yes'
                    except Malware.DoesNotExist:
                        pass
                    res = look.lookup_by_url(redirect)
                    if res and res == 'M':
                        alerts = 'yes'
                response = {'result': 'true', 'redirect': redirect, 'alert': alerts }
            else:
                response = {'result': 'false'}
        else:
            response = {'result': 'false'}
    else:
        response = {'result': 'false'}
    return response
    #return {'result' : urlobj}

@render_to('index.html')
def index(request):
    response = check_url(request) 
    return {'response': response}

def json_request(request):
    response = check_url(request)    
    response_json = json.dumps(response)
    return HttpResponse(response_json, 
                        mimetype='application/json', 
                        content_type = 'application/json; charset=utf8')