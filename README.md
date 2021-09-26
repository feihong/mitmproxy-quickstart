# Feihong's mitmproxy quickstart

A relatively simple project to scrape part of a website using mitmproxy (specifically the mitmdump CLI tool). You would not normally need to resort to a proxy to do scraping, but if you want to handle streaming media then it is essential to capture all responses so you can combine media files together after running mitmdump. Also, I find that having all request and response data available in one place really speeds up the process of writing the scraping logic. Of course, the downside of this approach is that you end up downloading a ton of data that you don't need.

## Prerequisites

    brew install yarn node aacgain atomicparsley mitmproxy
    brew install ffmpeg --with-fdk-aac

## Installation

    yarn install

### Install certificate

You need to install mitmproxy certificate to proxy https requests.

1. On target device, configure proxy settings
1. Visit the magic domain http://mitm.it and follow the instructions to install the mitmproxy certificate

## Procedure

1. `yarn clean`
1. `yarn start:proxy`
1. Set proxy to host: localhost, port: 8080
1. Load a playlist page
1. Start playing a playlist
1. Switch to album cover mode
1. To help keep track of progress, click '列表' on the top menu
1. Don't let display go to sleep
1. Wait until all tracks have played
1. Stop proxy
1. `yarn process`
1. Generated files will be in `output` folder

## Commands

    mitmdump -ns addons/list_paths.py -r dumpfile
    mitmdump -ns addons/dump_all_cover_art.py -r dumpfile

## Types of urls

Song metadata (html): https://streetvoice.com/megafeihong/playlists/583232/

Lyrics (json): https://streetvoice.com/api/v3/songs/579453/?only_fields=lyrics,lyrics_is_lrc&_=1555736582256

Link song id to audio filename (json): https://streetvoice.com/api/v3/songs/579029/hls/

Audio: https://cfhls.streetvoice.com/music/mi/ss/missbac/UFytKaN2SdsVNuToEZmbEk.mp3.hls.mp3-00019.ts

Cover art: https://cfstatic.streetvoice.com/song_covers/go/od/goodband/eHuHxnUpXxqEt4j8a7i9Za.jpg?x-oss-process=image/resize,m_fill,h_610,w_610,limit_0/interlace,1/quality,q_85/format,jpg

## Notes

On Linux, Chrome doesn't use the system certificates, just like FireFox (which never uses system certs on any platform). Look at [these instructions](https://stackoverflow.com/a/15076602/198996) for a hint of how it's done, but note that you can import the .pem file directly in the Authority tab, no need to export the certificate and then import it. 
