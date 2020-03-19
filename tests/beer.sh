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
echo -e "\033[33mAffichage de la première bière par LIMIT, Args={ limit: 1 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage de la deuxième bière, Args={ limit: 1, page: 1 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=1&page=1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: page inexistante, Args={ limit: 1, page: 999999 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=1&page=999999"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: page sans limite, Args={ page: 1 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?page=1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage de la deuxième bière de France, Args={ limit: 1, page: 1, country: france }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=1&page=1&country=france"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage de la deuxième bière de Chicago, Args={ limit: 1, page: 1, city: chicago }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=1&page=1&city=chicago"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: pays/ville inexistante, Args={ limit: 1, city: jfrjfb }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=1&city=jfrjfb"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage d'une bière avec deg < 2.5, Args={ limit: 1, degBelow: 2.5 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=1&degBelow=2"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage d'une bière avec deg > 15, Args={ limit: 1, degAbove: 15 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=1&degAbove=15"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage d'une bière avec 2 < deg < 15, Args={ limit: 1, degAbove: 2, degBelow: 15 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=1&degAbove=2&degBelow=15"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: degAbove/degBelow hors limites [0,100[, Args={ limit: 1, degAbove: 100 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=1&degAbove=100"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage ordonné par nom, Args={ limit: 2, orderBy: name }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/beer/search?limit=2&orderBy=name"