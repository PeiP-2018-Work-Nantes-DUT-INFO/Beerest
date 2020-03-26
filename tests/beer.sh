#!/bin/sh

#Affichage des bières
# echo '------------------------------------------------------------------------------'
# echo "Affichage des bières"
# curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer
# echo
echo -e "\033[33mAffichage des bières\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage de la première bière par ID\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: bière inexistante\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/999999"
echo
echo '------------------------------------------------------------------------------'
body='{"name":"Corona Beer","id":"5915","brewery_id":"1423","cat_id":"11","style_id":"116","alcohol_by_volume":"4.5","international_bitterness_units":"0","standard_reference_method":"0","universal_product_code":"0","universal_product_code":"0","description":"The best beer, when you are not sick","add_user":"0","last_mod":"2010-07-22 22:00:00+02:00","style":"Light American Wheat Ale or Lager","category":"Other Style","brewer":"Magic Hat","address":"5 Bartlett Bay Road","city":"Beijing","state":"Chinese state","country":"China","coordinates":"44.4284, -73.2131","website":"http://www.magichat.net/"}'
echo -e "\033[33mCreation de la bière $body\033[39m"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d "$body" "http://localhost:3000/api/beer/"
echo
echo '------------------------------------------------------------------------------'
body='{"name":"Corona Beer","id":"5915","brewery_id":"1423","cat_id":"11","style_id":"116","alcohol_by_volume":"4.5","international_bitterness_units":"0","standard_reference_method":"0","universal_product_code":"0","universal_product_code":"0","description":"The best beer, when you are not sick","add_user":"0","last_mod":"2010-07-22 22:00:00+02:00","style":"Light American Wheat Ale or Lager","category":"Other Style","brewer":"Magic Hat","address":"5 Bartlett Bay Road","city":"Beijing","state":"Chinese state","country":"China","coordinates":"44.4284, -73.2131","website":"http://www.magichat.net/"}'
echo -e "\033[31mERREUR: Creation d'un double bière $body\033[39m"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d "$body" "http://localhost:3000/api/beer/"
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"DemoUpdate","lastMod":"2010-06-08T02:00:00+02:00"}'
echo -e "\033[33mMise à jour de la catégorie 100 : $body\033[39m"
curl --noproxy "*" -H "Content-Type: application/json"  -X PUT -d $body "http://localhost:3000/api/categorie/100"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage des 100 premières bière par LIMIT, Args={ limit: 100 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage des 100 bières suivantes, Args={ limit: 100, page: 1 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&page=1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: page inexistante, Args={ limit: 100, page: 999999 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&page=999999"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: page sans limite, Args={ page: 1 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?page=1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage des bières de France, Args={ limit: 100, country: france }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&country=france"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage des bières de Chicago, Args={ limit: 100, city: chicago }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&city=chicago"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: pays/ville inexistante, Args={ limit: 100, city: jfrjfb }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&city=jfrjfb"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage de bières avec deg < 2.5, Args={ limit: 100, degBelow: 2.5 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&degBelow=2"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage de bières avec deg > 15, Args={ limit: 100, degAbove: 15 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&degAbove=15"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage de bières avec 2 < deg < 15, Args={ limit: 100, degAbove: 2, degBelow: 15 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&degAbove=2&degBelow=15"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: degAbove/degBelow hors limites [0,100[, Args={ limit: 100, degAbove: 100 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&degAbove=100"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage ordonné par nom, Args={ limit: 100, orderBy: name }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&orderBy=name"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: nom de colonne inexistant, Args={ limit: 100, orderBy: nom }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&orderBy=nom"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mSuppression de la bière 5915\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE "http://localhost:3000/api/beer/5915"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: Suppression d'une bière inexistante 0\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE "http://localhost:3000/api/beer/1234"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: Affichage de la bière 5915\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/100"
