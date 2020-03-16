#!/bin/sh

#Affichage des bières
# echo '------------------------------------------------------------------------------'
# echo "Affichage des bières"
# curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer
# echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la première bière par ID"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une bière inexistante"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/999999
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la première bière par LIMIT, Args={ limit: 1 }"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/search?limit=1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la deuxième bière, Args={ limit: 1, page: 1 }"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/search?country=fr&limit=1
echo
echo '------------------------------------------------------------------------------'
