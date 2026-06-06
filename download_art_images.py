import urllib.request
import urllib.parse
import json
import os

queries = {
    'istanbul_modern.jpg': 'Istanbul Modern',
    'karakoy_streetart.jpg': 'Karaköy',
    'ebru_art.jpg': 'Paper marbling',
    'montmartre.jpg': 'Montmartre',
    'florence_art.jpg': 'Uffizi',
    'vatican_museum.jpg': 'Vatican Museums'
}

os.makedirs('images', exist_ok=True)

for filename, query in queries.items():
    print(f"Fetching image for {query}...")
    url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={urllib.parse.quote(query)}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            page = list(pages.values())[0]
            if 'original' in page:
                image_url = page['original']['source']
                print(f"Downloading {image_url} to images/{filename}")
                
                img_req = urllib.request.Request(image_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(img_req) as img_response:
                    with open(f"images/{filename}", 'wb') as f:
                        f.write(img_response.read())
            else:
                print(f"No image found for {query}")
    except Exception as e:
        print(f"Error fetching {query}: {e}")
