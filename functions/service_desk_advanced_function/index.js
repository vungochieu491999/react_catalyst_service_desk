const express = require('express');
const catalystSDK = require('zcatalyst-sdk-node');
const {
	ZCQL,
	deleteFile,
	deleteRow,
	updateRow,
	insertRow,
	insertRows,
	getRow,
	downloadFile
} = require('./models/catalystbasequery');

const app = express();
app.use(express.json());

//GET API. Get existing tasks if any from the server.
app.get('/portal', async (req, res) => {
	try {
		var catalyst = catalystSDK.initialize(req);
		const page = parseInt(req.query.page);
		const perPage = parseInt(req.query.perPage);
		let hasMore = false;
		let portals = [];

		queryCount = 'SELECT COUNT(ROWID) FROM ServicePortals';

		await ZCQL(catalyst, queryCount)
		.then((rows) => {
			hasMore = parseInt(rows[0].ServicePortals.ROWID) > page * perPage;
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

		queryPortals = `SELECT ROWID,name,descriptions,feature_image FROM ServicePortals LIMIT ${(page - 1) * perPage + 1},${perPage}`;

		await ZCQL(catalyst, queryPortals)
		.then((rows) => {
			portals = rows.map((row) => ({
				id: row.ServicePortals.ROWID,
				name: row.ServicePortals.name,
				descriptions: row.ServicePortals.descriptions,
				feature_image: row.ServicePortals.feature_image,
			}))
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

		res.status(200).send({
			status: 'success',
			data: {
				portals,
				hasMore
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
		status: 'failure',
		message: "We're unable to process the request."
		});
	}
});

//search service support
app.get('/request-type', async (req, res) => {
	try {
		var catalyst = catalystSDK.initialize(req);
		const page = parseInt(req.query.page);
		const perPage = parseInt(req.query.perPage);
		let hasMore = false;
		let portals = [];

		queryCount = 'SELECT COUNT(ROWID) FROM ServicePortals';

		await ZCQL(catalyst, queryCount)
		.then((rows) => {
			hasMore = parseInt(rows[0].ServicePortals.ROWID) > page * perPage;
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

		queryPortals = `SELECT ROWID,name,descriptions,feature_image FROM ServicePortals LIMIT ${(page - 1) * perPage + 1},${perPage}`;

		await ZCQL(catalyst, queryPortals)
		.then((rows) => {
			portals = rows.map((row) => ({
				id: row.ServicePortals.ROWID,
				name: row.ServicePortals.name,
				descriptions: row.ServicePortals.descriptions,
				feature_image: row.ServicePortals.feature_image,
			}))
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

		res.status(200).send({
			status: 'success',
			data: {
				portals,
				hasMore
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
		status: 'failure',
		message: "We're unable to process the request."
		});
	}
});

// Get detail of portal
app.get('/portal/:ROWID', async (req, res) => {
	try {
		const { ROWID } = req.params;
		var catalyst = catalystSDK.initialize(req);
		const table = catalyst.datastore().table('TodoItems');
		await table.deleteRow(ROWID);
		res.status(200).send({
		status: 'success',
		data: {
		todoItem: {
		id: ROWID
		}
		}
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
		status: 'failure',
		message: "We're unable to process the request."
		});
	}
});

module.exports = app;