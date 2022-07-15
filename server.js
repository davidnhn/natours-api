const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

dbConnect()
  .then(() => console.log('✔️   connected to db'))
  .catch((err) => console.log(err));

async function dbConnect() {
  await mongoose.connect(DB);
}

// console.log(app.get('env')); // developpement
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
