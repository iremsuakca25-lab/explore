import urllib.request
import json

url = "https://unsplash.com/napi/search/photos?query=paragliding&per_page=10"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9'
}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode('utf-8'))
        print("Success! Photos found:")
        # The structure is typically data['results']
        results = data.get('results', [])
        for photo in results:
            print(f"ID: {photo.get('id')}")
            print(f"Description: {photo.get('description') or photo.get('alt_description')}")
            urls = photo.get('urls', {})
            print(f"Regular URL: {urls.get('regular')}")
            print("-" * 50)
except Exception as e:
    print("Error:", e)
