import typing

import mitmproxy.http
from mitmproxy import ctx

class MyAddon:
  def response(self, flow: mitmproxy.http.HTTPFlow):
    """
    The full HTTP response has been read.
    """
    ctx.log.info(flow.request.path)

addons = [
  MyAddon()
]
