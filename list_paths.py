import typing

import mitmproxy.http
from mitmproxy import ctx

class MyAddon:
  def response(self, flow: mitmproxy.http.HTTPFlow):
    """
    The full HTTP response has been read.
    """
    ctx.log.info(flow.request.path)
    content_type = flow.response.headers.get('content-type')
    if not content_type:
      ctx.log.warn('  no content-type')
    else:
      ctx.log.info('  ' + content_type)

addons = [
  MyAddon()
]
