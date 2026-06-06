import urllib.request
import urllib.parse
import json

query = 'Ölüdeniz'
url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={urllib.parse.quote(query)}"
req = urllib.request.Request(url, headers={'User-Agent': 'CoolBot/1.0'})
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    pages = data['query']['pages']
    page = list(pages.values())[0]
    if 'original' in page:
        image_url = page['original']['source']
        print(f"Downloading {image_url} to images/parasut.png")
        img_req = urllib.request.Request(image_url, headers={'User-Agent': 'CoolBot/1.0'})
        with urllib.request.urlopen(img_req) as img_response:
            with open("images/parasut.png", 'wb') as f:
                f.write(img_response.read())
