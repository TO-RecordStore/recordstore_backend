const Record = require('../models/Record');
const User = require('../models/User');
const faker = require('faker');
const axios = require('axios');
const env = require('../config/config');
require('../utilities/dbConnection');

(async () => {
  // DROPPING THE DB COLLECTIONS

  try {
    await User.deleteMany();
    console.log(`users deleted!`);
  } catch (err) {
    console.log(err);
  }

  try {
    await Record.deleteMany();
    console.log(`records deleted!`);
  } catch (err) {
    console.log(err);
  }

  // CREATING NEW USERS WITH FAKER.JS

  const userPromises = Array(5)
    .fill(null)
    .map(() => {
      const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        nickname: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'qwertyuiiop555',
      };
      console.log(`User ${userData.nickname} has been added!`);
      const user = new User(userData);
      return user.save();
    });

  try {
    await Promise.all(userPromises);
  } catch (err) {
    console.log(err);
  }

  // CREATING NEW RECORDS WITH LAST.FM API

  const fetchRecordsFromLastFM = async () => {
    const URI = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=machine&api_key=${env.lastFmKey}&format=json`;
    try {
      const recordsData = await axios.get(URI);
      const records = recordsData.data.results.albummatches.album;

      return records.slice(0, 20).map((record) => {
        const newRecordData = {
          title: record.name,
          artist: record.artist,
          cover: record.image[3]['#text'],
          year: Math.floor(Math.random() * 50) + 1970,
          price: 19.99,
        };

        const newRecord = new Record(newRecordData);
        return newRecord.save();
      });
    } catch (err) {
      console.log(err);
    }
  };
  const recordsPromises = await fetchRecordsFromLastFM();

  try {
    await Promise.all(recordsPromises);
  } catch (err) {
    console.log(err);
  }
})();
