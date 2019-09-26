/**
 * Variable for access to server
 *
 * @type {object} server
 */
const server = require("../server.js");

/**
 * Variable for access to form information
 * @type {object} bodyParser
 */
const bodyParser = require("body-parser");

/**
 * Variable for access to controller
 *
 * @type {object} donationController
 */
const donationController = require("../controllers/donationController.js");

/**
 * Configure server
 *
 * @return void
 */
exports.configureServer = () => {
  server.app.use(async (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });
  server.app.use(bodyParser.urlencoded({ extended: false }));
  server.app.use("/donate", donationController.renderDonatePage);
  server.app.use("/page=:page", donationController.renderDashboardPage);
  server.app.use("/toDonate", donationController.receivingDonationData);
  server.app.use("/", donationController.redirectToFirstPage);
  server.app.use("*", donationController.renderErrorPage);
};
