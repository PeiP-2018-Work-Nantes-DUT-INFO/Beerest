#!/bin/sh

#Affichage des catégorie
echo -e "\033[33mAffichage des catégries\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/categorie"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage de la première catégorie\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/categorie/1"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: Affichage d'une catégorie inexistante\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/categorie/1234"
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo -e "\033[33mCreation de la catégorie $body\033[39m"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body "http://localhost:3000/api/categorie/"
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo -e "\033[31mERREUR: Creation d'un double la catégorie $body\033[39m"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body "http://localhost:3000/api/categorie/"
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"DemoUpdate","lastMod":"2010-06-08T02:00:00+02:00"}'
echo -e "\033[33mMise à jour de la catégorie 100 : $body\033[39m"
curl --noproxy "*" -H "Content-Type: application/json"  -X PUT -d $body "http://localhost:3000/api/categorie/100"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mAffichage de la catégorie 100\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/categorie/100"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[33mSuppression de la catégoie 100\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE "http://localhost:3000/api/categorie/100"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: Suppression d'une catégorie inexistante 100\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE "http://localhost:3000/api/categorie/100"
echo
echo '------------------------------------------------------------------------------'
echo -e "\033[31mERREUR: Affichage de la catégorie 100\033[39m"
curl --noproxy "*" -H "Content-Type: application/json" -X GET "http://localhost:3000/api/categorie/100"