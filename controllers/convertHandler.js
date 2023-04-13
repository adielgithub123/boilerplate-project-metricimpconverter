const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const units = {
  gal: "L",
  L: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs",
};

const conversionRate = {
  gal: galToL,
  L: 1 / galToL,
  mi: miToKm,
  km: 1 / miToKm,
  lbs: lbsToKg,
  kg: 1 / lbsToKg,
};

const unitMapping = {
  gal: "gallons",
  L: "liters",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
};

function numberStringSplit(input){
  let getAlpIx = /[a-zA-Z]/i.exec(input).index;

  return [getAlpIx==0 ? 1 : input.toString().slice(0, getAlpIx), input.toString().slice(getAlpIx)];
}

function numDiv(val){
  let splitNum = val.toString().split("/");
  if(splitNum.length>2){
    return false;
  }
  return [splitNum[0], splitNum[1] || 1];
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let num = numDiv(numberStringSplit(input)[0]);
    if(!num){
      return "invalid number"
    }
    
    return parseFloat(num[0])/parseFloat(num[1]);
  };
  
  this.getUnit = function(input) {
    let unit = numberStringSplit(input)[1].toLowerCase();
    if(unit==="L" || unit==="l") return "L";
    if (units.hasOwnProperty(unit.toLowerCase())) {
      return unit.toLowerCase();
    }
    return "invalid unit";
  };
  
  this.getReturnUnit = function(initUnit) {
    let unit = this.getUnit(initUnit);
    if (units.hasOwnProperty(unit)) {
      return units[unit];
    }
    return "invalid unit";
  };

  this.spellOutUnit = function(unit) {
    return unitMapping[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    return Math.round(conversionRate[initUnit] * initNum * 1e5) / 1e5;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    // "1.8 pounds converts to 0.81647 kilograms"
    return initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
  };

  
}

module.exports = ConvertHandler;