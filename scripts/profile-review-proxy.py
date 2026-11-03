"""Read-only loopback preview of the local Profile app; production headers unchanged."""
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
from http.client import HTTPConnection
class Proxy(BaseHTTPRequestHandler):
 def do_GET(self): self.forward(False)
 def do_HEAD(self): self.forward(True)
 def do_POST(self): self.send_error(405,'Read-only review')
 def forward(self,head):
  upstream=HTTPConnection('127.0.0.1',8870,timeout=60)
  try:
   headers={k:v for k,v in self.headers.items() if k.lower() not in ['host','connection','accept-encoding']};headers['Host']='127.0.0.1:8870'
   upstream.request('HEAD' if head else 'GET',self.path,headers=headers);response=upstream.getresponse();body=response.read()
   self.send_response(response.status)
   for k,v in response.getheaders():
    if k.lower() not in ['x-frame-options','connection','transfer-encoding','content-length','content-encoding']:self.send_header(k,v)
   self.send_header('Content-Length',str(len(body)));self.send_header('Cache-Control','no-store');self.end_headers()
   if not head:self.wfile.write(body)
  finally:upstream.close()
ThreadingHTTPServer(('127.0.0.1',8872),Proxy).serve_forever()
