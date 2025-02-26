function ConvertHandler() {

  this.getNum = function(input) {
    let result = input.match(/^[\d/.]+/);
    
    if (!result) return 1; // Default to 1 if no number is provided
    
    result = result[0];

    // Check for multiple fractions (invalid case)
    if (result.split('/').length > 2) {
      return null;
    }

    // Evaluate fraction if present
    try {
      return eval(result);
    } catch (e) {
      return null;
    }
  };

  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+/g);
    if (!result) return null;
    
    let unit = result[0].toLowerCase();
    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (!validUnits.includes(unit)) return null;

    // ✅ Ensure "L" is uppercase
    return unit === 'l' ? 'L' : unit;
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    return unitMap[initUnit] || null;
  };

  this.spellOutUnit = function(unit) {
    const spelledOutUnits = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    return spelledOutUnits[unit] || null;
  };

  this.convert = function(num, unit) {
    const conversionRates = {
      gal: 3.78541,
      L: 1 / 3.78541,
      mi: 1.60934,
      km: 1 / 1.60934,
      lbs: 0.453592,
      kg: 1 / 0.453592
    };

    return parseFloat((num * conversionRates[unit]).toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
