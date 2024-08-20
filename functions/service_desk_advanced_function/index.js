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

		queryCount = 'SELECT COUNT(ROWID) FROM Portals';

		await ZCQL(catalyst, queryCount)
		.then((rows) => {
			hasMore = parseInt(rows[0].Portals.ROWID) > page * perPage;
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

		queryPortals = `SELECT ROWID,name,descriptions,feature_image FROM Portals LIMIT ${(page - 1) * perPage + 1},${perPage}`;

		await ZCQL(catalyst, queryPortals)
		.then((rows) => {
			portals = rows.map((row) => ({
				id: row.Portals.ROWID,
				name: row.Portals.name,
				descriptions: row.Portals.descriptions,
				feature_image: row.Portals.feature_image,
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
		let portalDetails = null;
		let services = [];

		queryPortal = `SELECT p.ROWID, p.name, p.descriptions FROM Portals p WHERE p.ROWID = ${ROWID}`;

		await ZCQL(catalyst, queryPortal)
		.then((rows) => {
			if (rows[0]) {
				portalDetails = {
					id: rows[0]?.p?.ROWID || null,
					name: rows[0]?.p?.name || null,
					descriptions: rows[0]?.p?.descriptions || null,
				}
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

		if (portalDetails) {
			queryServicePortal = `SELECT s.ROWID, s.name, s.descriptions FROM Services s JOIN ServicePortals sp ON s.ROWID = sp.serviceId WHERE sp.portalId = ${ROWID}`;

			await ZCQL(catalyst, queryServicePortal)
			.then((rows) => {
				services = rows.map((row) => ({
					id: row.s.ROWID,
					name: row.s.name,
					descriptions: row.s.descriptions,
				}))
			})
			.catch((err) => {
				console.log(err);
				res.status(500).send(err);
			});
		} else {
			res.status(500).send({
				status: 'failure',
				data: {},
				error: 1
			});
		}

		res.status(200).send({
			status: 'success',
			data: {
				portalDetails,
				services
			}
		});
	} catch (err) {
		res.status(500).send({
			status: 'failure',
			message: "We're unable to process the request."
		});
	}
});

// Get service
app.get('/service', async (req, res) => {
	try {
		const { query } = req.query;

		var catalyst = catalystSDK.initialize(req);
		let serviceItems = [];

		queryServices = `SELECT s.ROWID, s.name, s.descriptions, s.feature_image,
		p.ROWID, p.name, p.descriptions
		FROM Services s
		JOIN ServicePortals sp ON s.ROWID = sp.serviceId
		JOIN Portals p ON p.ROWID = sp.portalId
		WHERE s.name like '*${query}*'`;

		// queryServices = `SELECT s.ROWID, s.name, s.descriptions FROM Services s WHERE s.name like '*${query}*'`;

		await ZCQL(catalyst, queryServices)
		.then((rows) => {
			console.log(rows);
			serviceItems = rows.map((row) => ({
				id: row.s.ROWID,
				name: row.s.name,
				descriptions: row.s.descriptions,
				feature_image: row.s?.feature_image,
				portalId: row.p.ROWID,
				portalName: row.p.name,
				portalDescriptions: row.p.descriptions,
			}))
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

		res.status(200).send({
			status: 'success',
			data: {
				serviceItems,
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