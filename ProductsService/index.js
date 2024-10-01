
const app = require('./app.js');
const { connectDb } = require('./Db/connect.js');

connectDb()
  .then(() => {
    app.listen(10000, () =>
      console.log(`Product Server is running on the port 10000`)
    );
  })
  .catch(err => console.log(err));
