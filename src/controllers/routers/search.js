/* eslint-disable no-console */
const { raw } = require('objection');
const { Beneficiary } = require('../../models');
/**


/**
 * Retrieve beneficiaries by Name with fuzzy search
 * @param {Request} req
 * @param {Response} res
 */
const getSearch = async (req, res) => {
  const benresult = await Beneficiary.query()
    .select(raw(`*`))
    .where(
      raw(
        `similarity (':searchBody:', "Name" || ' ' || "BeneficiaryId" || ' ' || "Email") > 0.10`,
        {
          searchBody: 'a',
        }
      )
    );
  res.status(200).json({ benresult });
};

console.log(getSearch);
module.exports = {
  getSearch,
};
