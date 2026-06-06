import urllib.request
import re

url = "https://html.duckduckgo.com/html/?q=site:livetheworld.com+paragliding"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
req = urllib.request.Request(url, headers=headers)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        # Find all URLs in search results
        urls = re.findall(r'https?://[^\s"\'<>]+', html)
        print("Found travel blog URLs:")
        for u in set(urls):
            if 'livetheworld' in u:
                print("  Blog URL:", u)
except Exception as e:
    print("Error:", e)
