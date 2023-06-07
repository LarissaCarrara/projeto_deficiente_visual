const mysql = require('mysql')

// const con = mysql.createConnection({
//     user: 'ia_user',
//     password:'K4irj8By8uJsZpwCTHGpX2i5QSH9IsNm',
//     host: 'dpg-chh1es3hp8u065t35230-a.oregon-postgres.render.com',
//     database: 'ia'
// });
const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'ia'
});
module.exports = con;

//psql -U ia_user -d ia -h dpg-chh1es3hp8u065t35230-a.oregon-postgres.render.com -p 5432
//postgres://ia_user:K4irj8By8uJsZpwCTHGpX2i5QSH9IsNm@dpg-chh1es3hp8u065t35230-a.oregon-postgres.render.com/ia