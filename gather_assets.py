import os
import urllib.parse

POSTER_BASE = "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/PORTFOLIO%20Works/"
CLIENT_BASE = "https://raw.githubusercontent.com/polaroiddosa/portfolio/main/client%20details/"

# PORTFOLIO Works files (provided by user)
portfolio_works = [
    "0001 (1).jpg", "0001 (1).png", "0001 (2).jpg", "0001 - 01.png", "0001-01.jpg", "0001.jpg",
    "0002 (1).jpg", "0002 (1).png", "0002 - 5.jpg", "0002.jpg", "0003 (1).jpg", "0003 (2).jpg",
    "0003(1).jpg", "0003.jpg", "0003.png", "0004 (1)(1).jpg", "0004 (1)(2).jpg", "0004 (1).jpg",
    "0004.jpg", "0005 (1).jpg", "0005 - 2.jpg", "0005.jpg", "0006-1.jpg", "0006.jpg", "0007(1).jpg",
    "0007.jpg", "0008 (1).jpg", "0008 - 001.jpg", "0008 - 002.jpg", "0008.jpg", "0009 - 002.jpg",
    "0009.jpg", "0010 (1).jpg", "0010.jpg", "0011-1.jpg", "0012.jpg", "0013.jpg", "0014.jpg",
    "0015.jpg", "NEC.png", "YRTS.png", "coming soon.jpg", "hiring.jpg", "inauguration.jpg",
    "launch poster.png", "notice english.jpg", "notice malayalam.jpg", "obt.png", "placement.png",
    "poster 2.png"
]

# client details subdirectories and files
client_details = {
    "LEAD": [
        "0001 (1).jpg", "0001.jpg", "0002.jpg", "0003 (1).jpg", "0003 (2).jpg", "0003.jpg",
        "0005.jpg", "0006 portait.jpg", "0007(1).jpg", "0007.jpg", "ADISH.jpg", "easter.jpg",
        "foreign.jpg", "foreign2.jpg", "ilead feedback.jpg", "joseph.jpg", "kk.jpg", "salon.jpg",
        "sunil nair.jpg"
    ],
    "Livart academy": ["0001.png", "0002.png", "0010.jpg", "0011.jpg", "0012.jpg", "0013.jpg", "0014.jpg"],
    "NEC": [
        "0001.jpg", "0002.jpg", "0003.jpg", "0006.jpg", "0008.jpg", "0009.jpg", "0010.jpg",
        "0014.jpg", "0027.jpg", "0028.jpg", "00aa.jpg", "00ab.jpg", "CERTIFICATE.jpg", "stage.png"
    ],
    "cusat": ["0001.jpg", "0002.jpg"],
    "feastale": ["0001.jpg"],
    "happiocaUntitled folder": ["hcircle3.png", "hiring.jpg", "tree poster.jpg"],
    "kerala startup carnival": ["0002.jpg"],
    "livart salon": [
        "0001.jpg", "0002 - 04.jpg", "0003 (1).jpg", "0003.jpg", "0004.jpg", "0005 - 2.jpg",
        "0006.jpg", "0007.jpg", "0009 - 001.jpg", "1x.jpg"
    ],
    "logo": ["Untitled.png"],
    "st peters kolenchery": ["0001.jpg", "0002.jpg", "0003.jpg"],
    "taste of malabar": [
        "0006.jpg", "0007.jpg", "0008.jpg", "0009.jpg", "0010.jpg", "0011.jpg", "0012.jpg",
        "0013.jpg", "0014-1.jpg", "0014.jpg", "0015.jpg"
    ],
    "trackon": ["0001-01.jpg", "0002.jpg"]
}

all_assets = []

for f in portfolio_works:
    all_assets.append({
        "path": POSTER_BASE + urllib.parse.quote(f),
        "title": f.split('.')[0].replace('-', ' ').title()
    })

for folder, files in client_details.items():
    for f in files:
        all_assets.append({
            "path": CLIENT_BASE + urllib.parse.quote(folder) + "/" + urllib.parse.quote(f),
            "title": f"{folder} - {f.split('.')[0].replace('-', ' ').title()}"
        })

import json
print(json.dumps(all_assets, indent=2))
