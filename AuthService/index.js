require('dotenv').config();
const app = require('./app.js');
const { connectDb } = require('./Db/connect.js');

connectDb()
  .then(() => {
    app.listen(9000, () =>
      console.log(`Auth Server is running on the port 9000`)
    );
  })
  .catch(err => console.log(err));
