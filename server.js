/**
 * Variable to access express.js
 * @type {object} express
 */
const express = require("express");

/**
 * Variable to access express engine
 * 
 * @type {object} app
 */
const app = express();

/**
 * Start server
 * 
 * @return void
 */
exports.startServer = () => {
	app.listen(3000);
};

exports.app = app;
