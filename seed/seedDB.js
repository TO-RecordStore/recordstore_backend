require('dotenv').config();

const mongoose = require('mongoose');
const Record = require('../models/Record');
const User = require('../models/User');
const faker = require('faker');
const axios = require('axios');

const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;
const db_name = process.env.DB_NAME;
const lastfm = process.env.LASTFM_KEY;


(async () => {

	// CONNECTING TO MONGODB

	const connectionStr = `mongodb+srv://${user}:${password}@cluster0.dkalb.mongodb.net/${db_name}?retryWrites=true&w=majority`;

	mongoose.connect(connectionStr, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});

	mongoose.connection.on("error", () =>
		console.log("[ERROR] DB connection failed")
	);
	mongoose.connection.on("open", () =>
		console.log("Connect to central db successfully")
	);

	// DROPPING THE DB COLLECTIONS

	try {
		await User.deleteMany();
		console.log(`users deleted!`);
	} catch (err) {
		console.log(err)
	}

	try {
		await Record.deleteMany();
		console.log(`records deleted!`);
	} catch (err) {
		console.log(err);
	}


	// CREATING NEW USERS WITH FAKER.JS

	const userPromises = Array(10).fill(null).map(() => {

		const userData = {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			nickname: faker.internet.userName(),
			email: faker.internet.email(),
			password: 'qwertyuiiop555',
			avatar: faker.internet.avatar(),
		}
		console.log(`User ${userData.nickname} has been added!`);
		const user = new User(userData);
		return user.save();
	})

	try {
		await Promise.all(userPromises);
	} catch (err) {
		console.log(err);
	}


	// CREATING NEW RECORDS WITH LAST.FM API

	const fetchRecordsFromLastFM = async () => {
		const URI = `http://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=${lastfm}&format=json`;
		try {
			const recordsData = await (axios.get(URI))
			const records = recordsData.data.results.albummatches.album;

			return records.slice(0, 20).map(record => {
				const newRecordData = {
					title: record.name,
					artist: record.artist,
					cover: record.image[2]["#text"],
					year: Math.floor(Math.random() * 50) + 1970,
					price: 19.99
				}

				const newRecord = new Record(newRecordData);
				return newRecord.save();
			});
		} catch (err) {
			console.log(err);
		}
	}
	const recordsPromises = await fetchRecordsFromLastFM();

	try {
		await Promise.all(recordsPromises);
	} catch (err) {
		console.log(err);
	}

})()
