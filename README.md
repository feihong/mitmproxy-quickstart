# Feihong's mitmproxy quickstart

## Basics

    mitmdump -ns list_paths.py -r dumpfile

## Steps

1. `mitmdump -w dumpfile ~u '.*streetvoice[.]com.*'`
1. Set proxy to host: localhost, port: 8080
1.

## Types of urls

Lyrics: https://streetvoice.com/api/v3/songs/579453/?only_fields=lyrics,lyrics_is_lrc&_=1555736582256

Audio: https://cfhls.streetvoice.com/music/mi/ss/missbac/UFytKaN2SdsVNuToEZmbEk.mp3.hls.mp3-00019.ts

Link song id to audio filename: https://streetvoice.com/api/v3/songs/579029/hls/

Song metadata (html): https://streetvoice.com/megafeihong/playlists/583232/

Large image: https://cfstatic.streetvoice.com/profile_images/au/ro/aurora1533/NYzcbN2KQBJzUokaPUsr86.jpg?x-oss-process=image/resize,m_fill,h_300,w_300,limit_0/interlace,1/quality,q_85/format,jpg

