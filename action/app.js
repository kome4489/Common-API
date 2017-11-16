module.exports = function(queryType, tableName, params) {
    var pg = require('pg');
    
    var config = {
        host: 'localhost',
        user: 'postgres',     
        password: 'admin',
        database: 'CommonApi',
        port: 5432,
        ssl: false
    };
    var query = '';
    switch(queryType) {
        case 'select': {
            var selectSql = '';
            Object.keys(params).map((key, index) => {
                if (selectSql === '') {
                    selectSql = `where ${key} = '${params[key]}'`;
                } else {
                    selectSql = `${selectSql} and ${key} = '${params[key]}'`;
                }
            });
            query = `SELECT * 
                        FROM ${tableName}
                        ${selectSql};`;
            break;
        }
        case 'create': {
            var columnSql = '';
            var valueSql = '';
            Object.keys(params).map((key, index) => {
                if (columnSql === '') {
                    columnSql = `${key}`;
                } else {
                    columnSql = `${columnSql}, ${key}`;
                }
                if (valueSql === '') {
                    valueSql = `'${params[key]}'`;
                } else {
                    valueSql = `${valueSql}, '${params[key]}'`;
                }
            });
            query = `INSERT INTO ${tableName} (${columnSql})
                        VALUES (${valueSql});`;
            break;
        }
        case 'update': {
            var selectSql = '';
            Object.keys(params).map((key, index) => {
                if (selectSql === '') {
                    selectSql = `where ${key} = '${params[key]}'`;
                } else {
                    selectSql = `${selectSql} and ${key} = '${params[key]}'`;
                }
            });
            query = `UPDATE ${tableName}
                        SET ${updateSql}
                        ${selectSql};`;
            break;
        }
        case 'delete': {
            var selectSql = '';
            Object.keys(params).map((key, index) => {
                if (selectSql === '') {
                    selectSql = `where ${key} = '${params[key]}'`;
                } else {
                    selectSql = `${selectSql} and ${key} = '${params[key]}'`;
                }
            });
            query = `DELETE
                        FROM ${tableName}
                        ${selectSql};`;
            break;
        }
        default:
            break;
    }
    console.log(query);
    
    return new Promise((resolve, reject) => {
        var client = new pg.Client(config);
        
        client.connect(err => {
            if (err) throw err;
            else { 
                client.query(query)
                    .then(res => resolve(res))
                    .catch(err => reject(err));
             }
        });
    });
}