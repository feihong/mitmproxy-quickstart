# Feihong's mitmproxy quickstart

## Basics

    mitmdump -ns list_paths.py -r dumpfile

## Procedure

1. `yarn clean`
1. Clear cached content in browser
1. `yarn start:proxy`
1. Set proxy to host: localhost, port: 8080
1. Start playing a playlist
1. Stop proxy
1. `yarn process`
1. Generated files will be in `output` folder

## Types of urls

Song metadata (html): https://streetvoice.com/megafeihong/playlists/583232/

Lyrics (json): https://streetvoice.com/api/v3/songs/579453/?only_fields=lyrics,lyrics_is_lrc&_=1555736582256

Link song id to audio filename (json): https://streetvoice.com/api/v3/songs/579029/hls/

Audio: https://cfhls.streetvoice.com/music/mi/ss/missbac/UFytKaN2SdsVNuToEZmbEk.mp3.hls.mp3-00019.ts

Large image: https://cfstatic.streetvoice.com/profile_images/au/ro/aurora1533/NYzcbN2KQBJzUokaPUsr86.jpg?x-oss-process=image/resize,m_fill,h_300,w_300,limit_0/interlace,1/quality,q_85/format,jpg
