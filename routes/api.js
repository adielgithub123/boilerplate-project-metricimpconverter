'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  let valNum = convertHandler.getNum(app)
  let valUnit = convertHandler.getUnit(app)
  let valReturnNum = convertHandler.convert(valNum,valUnit);
  let valReturnUnit = convertHandler.getReturnUnit(app)
  let valString = convertHandler.getString(valNum, valUnit, valReturnNum, valReturnUnit);

  return {
    valNum,
    valUnit,
    valReturnNum,
    valReturnUnit,
    valString
  };

};
