const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'root', 
     password: 'jpoli0909',
     connectionLimit: 20
});
async function query() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	

  } catch (err) {
	throw err;
  } finally {
	if (conn) conn.end();
  }
}
query().then(() => {
  pool.end();
});

module.exports = { query };
