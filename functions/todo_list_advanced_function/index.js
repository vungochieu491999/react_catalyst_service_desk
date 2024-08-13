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
app.get('/all', async (req, res) => {
	try {
		var catalyst = catalystSDK.initialize(req);
		const page = parseInt(req.query.page);
		const perPage = parseInt(req.query.perPage);
		let hasMore = false;
		let todoItems = [];

		queryCount = 'SELECT COUNT(ROWID) FROM TodoItems';

		await ZCQL(catalyst, queryCount)
		.then((rows) => {
			hasMore = parseInt(rows[0].TodoItems.ROWID) > page * perPage;
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

		queryTodoItems = `SELECT ROWID,Notes FROM TodoItems LIMIT ${(page - 1) * perPage + 1},${perPage}`;

		await ZCQL(catalyst, queryTodoItems)
		.then((rows) => {
			todoItems = rows.map((row) => ({
				id: row.TodoItems.ROWID,
				notes: row.TodoItems.Notes
			}))
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

		res.status(200).send({
			status: 'success',
			data: {
				todoItems,
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

// POST API. Contains the logic to create a task
app.post('/add', async (req, res) => {
try {
const { notes } = req.body;
var catalyst = catalystSDK.initialize(req);
const table = catalyst.datastore().table('TodoItems');
const { ROWID: id } = await table.insertRow({
Notes:notes
});
res.status(200).send({
status: 'success',
data: {
todoItem: {
id,
notes
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
// DELETE API. Contains the logic to delete a task.
app.delete('/:ROWID', async (req, res) => {
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