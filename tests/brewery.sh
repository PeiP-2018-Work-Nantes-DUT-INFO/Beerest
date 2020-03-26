#!/bin/sh

#Affichage des brasseries
# echo '------------------------------------------------------------------------------'
# echo "Affichage des brasseries"
# curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/brewery
# echo
echo -e "\033[33mAffichage des brasseries\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage de la première brasserie par ID = 1\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: brasserie inexistante ID = 999999\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/999999"
echo
echo '------------------------------------------------------------------------------'
body='{"id":9999,"breweries":"COVID-20","address1":"407 Radam, F200","address2":"","city":"Austin","state":"Texas","code":"78745","country":"United States","phone":"512.707.2337","website":"http://512brewing.com/","filepath":"","descript":"(512) Brewing Company is a microbrewery located in the heart of Austin that brews for the community using as many local, domestic and organic ingredients as possible.","last_mod":"2010-07-22T22:00:20+02:00","coordinates":"30.2234,-97.7697"}'
echo -e "\033[33mCreation de la brasserie $body\033[39m"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d "$body" "http://localhost:3000/api/brewery/"
echo
echo '------------------------------------------------------------------------------'
body='{"id":9999,"breweries":"COVID-20","address1":"407 Radam, F200","address2":"","city":"Austin","state":"Texas","code":"78745","country":"United States","phone":"512.707.2337","website":"http://512brewing.com/","filepath":"","descript":"(512) Brewing Company is a microbrewery located in the heart of Austin that brews for the community using as many local, domestic and organic ingredients as possible.","last_mod":"2010-07-22T22:00:20+02:00","coordinates":"30.2234,-97.7697"}'
echo -e "\033[31mERREUR: Creation d'un double brasserie $body\033[39m"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d "$body" "http://localhost:3000/api/brewery/"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage des 10 premières brasserie par LIMIT, Args={ limit: 10 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/search?limit=10"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage des 10 brasseries suivantes, Args={ limit: 10, page: 1 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/search?limit=10&page=1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: page inexistante, Args={ limit: 10, page: 999999 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/search?limit=10&page=999999"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: page sans limite, Args={ page: 1 }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/search?page=1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage des brasseries de France, Args={ limit: 10, country: france }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/search?limit=10&country=france"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage des brasseries de Chicago, Args={ limit: 10, city: chicago }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/search?limit=10&city=chicago"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: pays/ville inexistante, Args={ limit: 10, city: jfrjfb }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/search?limit=10&city=jfrjfb"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage ordonné par nom, Args={ limit: 10, orderBy: name }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/search?limit=10&orderBy=name"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: nom de colonne inexistant, Args={ limit: 10, orderBy: nom }\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/search?limit=10&orderBy=nom"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mSuppression de la brasserie 9999\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE "http://localhost:3000/api/brewery/9999"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: Suppression d'une brasserie inexistante 9999\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE "http://localhost:3000/api/brewery/9999"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: Affichage de la brasserie 9999\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/brewery/9999"
