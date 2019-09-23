/**
 * Variable to access the donation entity repository
 * 
 * @type {object} donationRepository
 */
 const donationRepository = require("../repositories/donation/DonationRepository.js");

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
 * 
 * 
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
 	const perPage = 10;
 	const page = req.params.page || 1;
 	if(page < 1) return;
 	const currentPage = Number(req.params.page);
 	const pages = await donationRepository.getPageCount(perPage);
 	if(isNaN(currentPage) || currentPage > pages) return;
 	const maxAmount = await donationRepository.getMaxAmount();
 	res.send([
 	{
 		donations: await donationRepository.read(perPage, page),
 		current: page,
 		pages: pages,
 		maxAmount: maxAmount,
 		topDonator: await donationRepository.getTopDonator(maxAmount),
 		amount: await donationRepository.sumAmount(),
 		amountForThisMonth: await donationRepository.getAmountForThisMonth(),
 		dataForChart: await donationRepository.getChartInfo()
 	}
 	])
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
 	const data = JSON.parse(Object.keys(req.body));
 	if(!data.name || !data.email || !data.amount || !data.message) {
 		console.log("All form fields must be filled")
 	} else {
 		const donationInfo = [
 		{
 			volunteer_name: data.name,
 			email: data.email,
 			amount: data.amount,
 			message: data.message,
 			date: new Date()
 		},
 		];

 		donationRepository.create(donationInfo);
 		res.redirect("/page=1");
 	}
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
