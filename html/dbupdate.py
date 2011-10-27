from safebrowsing.prepare_db import Google_Blacklist

# "malware" and "black" are valid options

g = Google_Blacklist("malware")
g.fetch_data()

g = Google_Blacklist("black")
g.fetch_data()