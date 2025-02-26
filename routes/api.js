'use strict';
require('dotenv').config();
const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Handle invalid inputs properly
    if (!initUnit && !initNum) {
      return res.json({ error: "invalid number and unit" });
    } else if (!initUnit) {
      return res.json({ error: "invalid unit" });
    } else if (!initNum) {
      return res.json({ error: "invalid number" });
    }
    

    // Debugging: Log response to verify correctness
    console.log("API Response:", { initNum, initUnit, returnNum, returnUnit, string: toString });

    res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
  });
};
