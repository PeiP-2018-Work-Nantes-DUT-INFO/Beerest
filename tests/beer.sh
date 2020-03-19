#!/bin/sh

#Affichage des bières
# echo '------------------------------------------------------------------------------'
# echo "Affichage des bières"
# curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer
# echo
echo -e "\033[33mAffichage de la première bière par ID\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: bière inexistante\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/999999"
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
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: nom de colonne inexistant, Args={ limit: 100, orderBy: nom }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=100&orderBy=nom"