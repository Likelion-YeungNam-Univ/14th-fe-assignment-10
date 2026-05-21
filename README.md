# 사용할 API
- https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search?console=1   

## API git 
- https://github.com/NTag/lyrics.ovh/tree/main  

```
API
An API is available to get the lyrics of a song:

GET https://api.lyrics.ovh/v1/{artist}/{title}
Returns { "lyrics": "..." } or a 404 error.

A suggestion endpoint is also available:

GET https://api.lyrics.ovh/suggest/{search term}
Returns search results from Deezer.
```