/**
 * Variable to access the donation entity repository
 *
 * @type {object} donationRepository
 */
const donationRepository = require("../repositories/donation/DonationRepository.js");

class DonationService {
  /**
   * Method for getting pagination page data
   *
   * @param  {object} reqPage
   *
   * @return {object}
   */
  async getPaginationPageData(reqPage) {
    const perPage = 10;
    const page = reqPage || 1;
    const badRequest = true;

    if (page < 1) {
      return [{ badRequest: badRequest }];
    }

    const currentPage = Number(reqPage);
    const pages = await donationRepository.getPageCount(perPage);

    if (isNaN(currentPage) || currentPage > pages) {
      return [{ badRequest: badRequest }];
    }

    const maxAmount = await donationRepository.getMaxAmount();

    return [
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
    ];
  }

  /**
   * Method for setting data to database
   *
   * @param {object} bodyData
   */
  async setPostData(bodyData) {
    const data = JSON.parse(Object.keys(bodyData));
    if (!data.name || !data.email || !data.amount || !data.message) {
      console.log("All form fields must be filled");
    } else {
      const donationInfo = [
        {
          volunteer_name: data.name,
          email: data.email,
          amount: data.amount,
          message: data.message,
          date: new Date()
        }
      ];
      donationRepository.create(donationInfo);
    }
  }
}

module.exports = new DonationService();
