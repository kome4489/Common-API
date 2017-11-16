module.exports = function() {
    const pg = require('pg');
    
    const config = {
        host: 'localhost',
        user: 'postgres',     
        password: 'admin',
        database: 'CommonApi',
        port: 5432,
        ssl: false
    };
    
    return new Promise((resolve, reject) => {
        const client = new pg.Client(config);
        
        client.connect(err => {
            if (err) throw err;
            else { 
                const query = 'SELECT * FROM puppy;';
                
                client.query(query)
                    .then(res => resolve(res))
                    .catch(err => reject(err));
             }
        });
    });
}