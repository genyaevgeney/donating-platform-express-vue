/**
 * Variable to access server
 *
 * @type {object} app
 */
const app = require("./server.js");

/**
 * Variable to access router
 * @type {object} router
 */
const router = require("./routes/Routes");

router.configureServer();
app.startServer();
