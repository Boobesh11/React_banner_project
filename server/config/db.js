const mysql = require('mysql2'); // Use 'mysql2' instead of 'mysql'

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',            // Your MySQL username
  password: '1234567890',  // Your MySQL password
  database: 'banner_db'    // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + db.threadId);
});
