const Brewery = require('../model/brewery')

const daoCommon = require('./commons/daoCommon')

class BreweryDAO {
    constructor () {
        this.common = new daoCommon()
    }

    findAll () {
        const sqlRequest = 'SELECT * FROM brewery'

        return this.common.findAll(sqlRequest)
            .then(rows => {
                const brewerys = rows.map(row => new Brewery(row))
                return brewerys
            })
    };

    findById (id) {
        const sqlRequest = 'SELECT * FROM brewery WHERE id=$id'
        const sqlParams = { $id: id }
        return this.common.findOne(sqlRequest, sqlParams)
            .then(row => new Brewery(row))
    };

    findByCatId (cat_id) {
        const sqlRequest = 'SELECT * FROM brewery WHERE cat_id = ?'
        const sqlParams = [cat_id]
        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(row => new Brewery(row))
    };

    create (brewery) {
        const sqlRequest = 'INSERT INTO brewery(' +
            'id,breweries,address1,address2,city,state,code,country,phone,website,filepath,descript,last_mod,coordinates) ' +
            'VALUES ($id,$breweries,$address1,$address2,$city,$state,$code,$country,$phone,$website,$filepath,$descript,$lastMod,$coordinates)'
        const sqlParams = {
            $id: row.id,
            $breweries: row.breweries,
            $address1: row.address1,
            $address2: row.address2,
            $city: row.city,
            $state: row.state,
            $code: row.code,
            $country: row.country,
            $phone: row.phone,
            $website: row.website,
            $filepath: row.filepath,
            $descript: row.descript,
            $lastMod: row.last_mod,
            $coordinates: row.coordinates
        }
        // console.log(sqlParams, sqlRequest);
        return this.common.run(sqlRequest, sqlParams)
    };

    deleteById (id) {
        const sqlRequest = 'DELETE FROM brewery WHERE id=$id'
        const sqlParams = { $id: id }
        return this.common.run(sqlRequest, sqlParams)
    };

    update (beer) {
        const sqlRequest = 'UPDATE beer SET ' +
            'id = $id' +
            'breweries = $breweries' +
            'address1 = $address1' +
            'address2 = $address2' +
            'city = $city' +
            'state = $state' +
            'code = $code' +
            'country = $country' +
            'phone = $phone' +
            'website = $website' +
            'filepath = $filepath' +
            'descript = $descript' +
            'last_mod = $last_mod' +
            'coordinates = $coordinates' +
            'WHERE id = $id'

        const sqlParams = {
            $id: row.id,
            $breweries: row.breweries,
            $address1: row.address1,
            $address2: row.address2,
            $city: row.city,
            $state: row.state,
            $code: row.code,
            $country: row.country,
            $phone: row.phone,
            $website: row.website,
            $filepath: row.filepath,
            $descript: row.descript,
            $lastMod: row.last_mod,
            $coordinates: row.coordinates
        }
        return this.common.run(sqlRequest, sqlParams)
    };

    /**
     *
     * @param {Object} params
     */
    search (params) {
        let sqlRequest_limit = ''
        let sqlRequest_offset = ''
        let sqlRequest_orderBy = ''
        let sqlRequest_where = ' WHERE'

        let sqlParams_limit = []
        let sqlParams_offset = []
        let sqlParams_orderBy = []
        let sqlParams_where = []

        for (const param in params) {

            switch (param) {
                case 'city':
                    if (sqlRequest_where != ' WHERE') {
                        sqlRequest_where += ' AND'
                    }
                    sqlRequest_where += ' city LIKE ?'
                    sqlParams_where.push('%'+params[param]+'%')
                    break;
                case 'country':
                    if (sqlRequest_where != ' WHERE') {
                        sqlRequest_where += ' AND'
                    }
                    sqlRequest_where += ' country LIKE ?'
                    sqlParams_where.push('%'+params[param]+'%')
                    break;
                case 'degAbove':
                    if (sqlRequest_where != ' WHERE') {
                        sqlRequest_where += ' AND'
                    }
                    sqlRequest_where += ' alcohol_by_volume > ?'
                    sqlParams_where.push(params[param])
                    break;
                case 'degBelow':
                    if (sqlRequest_where != ' WHERE') {
                        sqlRequest_where += ' AND'
                    }
                    sqlRequest_where += ' alcohol_by_volume < ?'
                    sqlParams_where.push(params[param])
                    break;
                case 'limit':
                    sqlRequest_limit = ' LIMIT ?'
                    sqlParams_limit.push(params[param])
                    break;
                case 'orderBy':
                    sqlRequest_orderBy = ' ORDER BY ?'
                    sqlParams_orderBy.push(params[param])
                    break;
                case 'page':
                    if (params.limit) {
                        sqlRequest_offset = ' OFFSET ?'
                        sqlParams_offset.push(params[param]*params.limit)
                    }
                    break;
            }
        }

        const sqlRequest = 'SELECT * FROM brewery'+
            ((sqlRequest_where)==' WHERE'?'':sqlRequest_where)+
            sqlRequest_orderBy+
            sqlRequest_limit+
            (sqlRequest_limit?sqlRequest_offset:'')
        const sqlParams = sqlParams_where.concat(sqlParams_orderBy.concat(sqlParams_limit.concat(sqlParams_offset)))

        console.log('Input request: \t\t',sqlRequest)
        console.log('Evaluated Params: \t',sqlParams)

        return this.common.findAllWithParams(sqlRequest, sqlParams)
            .then(rows => {
                const brewerys = rows.map(row => new Brewery(row))
                return brewerys
            })
            .catch(err => {
                console.log(err)
                return err
            })
    };
}

module.exports = BreweryDAO