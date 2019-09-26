 /**
  * Variable to access the donation service
  *
  * @type {object}
  */
 const donationService = require("../services/DonationService.js");
/**
 * Render error page
 * 
 * @param  {object} req
 * 
 * @param  {object} res
 * 
 * @return void
 */
 exports.renderErrorPage = (req, res) => {
 	res.render("Error");
 }

/**
 * @param  {object} req
 * 
 * @param  {object} res
 * 
 * @return void
 */
 exports.renderDonatePage = (req, res) => {
 	res.render("DonatePage");
 }

/**
 * Render form page
 * 
 * @param  {object} req
 * 
 * @param  {object} res
 * 
 * @return void
 */
 exports.renderDashboardPage = async (req, res) => {
 	const data = await donationService.getPaginationPageData(req.params.page)
 	res.send(data);
 }

/**
 * Enter data from the form into the database and redirect to the main page
 * 
 * @param  {object} req
 * 
 * @param  {object} res
 * 
 * @return void
 */
 exports.receivingDonationData = (req, res) => {
 	donationService.setPostData(req.body);
 	res.redirect("/page=1");
 }

/**
 * Redirect to home page
 * 
 * @param  {object} req
 * 
 * @param  {object} res
 * 
 * @return void
 */
 exports.redirectToFirstPage = (req, res) => {
 	res.redirect("/page=1");
 }
