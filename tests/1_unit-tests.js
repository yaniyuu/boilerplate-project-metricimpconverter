const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

    suite('Function convertHandler.getNum(input)', function() {
        test('should correctly read a whole number input', function() {
            assert.equal(convertHandler.getNum('32L'), 32);
        });

        test('should correctly read a decimal number input', function() {
            assert.equal(convertHandler.getNum('3.2L'), 3.2);
        });

        test('should correctly read a fractional input', function() {
            assert.equal(convertHandler.getNum('3/2L'), 1.5);
        });

        test('should correctly read fractional input with decimal', function() {
            assert.equal(convertHandler.getNum('3.1/2L'), 1.55);
        });

        test('should correctly return an error on a double fraction (i.e. 3/2/3)', function() {
            assert.isNull(convertHandler.getNum('3/2/3L'));
        });

        test('should correctly default to a numerical input of 1 when no numerical input is provided', function() {
            assert.equal(convertHandler.getNum('L'), 1);
        });
    });

    suite('Function convertHandler.getUnit(input)', function() {
        test('should correctly read each valid input unit', function() {
            let inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            inputUnits.forEach(function(ele) {
                let expected = ele.toLowerCase() === 'l' ? 'L' : ele.toLowerCase();
                assert.equal(convertHandler.getUnit('1' + ele), expected);
            });
        });

        test('should correctly return an error for an invalid input unit', function() {
            assert.isNull(convertHandler.getUnit('1invalid'));
        });
    });

    suite('Function convertHandler.getReturnUnit(initunit)', function() {
        test('should correctly return the correct return unit for each valid input unit', function() {
            let inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            let expectReturnUnits = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            inputUnits.forEach(function(ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expectReturnUnits[i]);
            });
        });
    });

    suite('Function convertHandler.spellOutUnit(unit)', function() {
        test('should correctly return the spelled-out string unit for each valid input unit', function() {
            let inputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            let expectSpellOutUnits = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
            inputUnits.forEach(function(ele, i) {
                assert.equal(convertHandler.spellOutUnit(ele), expectSpellOutUnits[i]);
            });
        });
    });

    suite('Function convertHandler.convert(num, unit)', function() {
        test('should correctly convert gal to L', function() {
            assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
        });

        test('should correctly convert L to gal', function() {
            assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
        });

        test('should correctly convert mi to km', function() {
            assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
        });

        test('should correctly convert km to mi', function() {
            assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
        });

        test('should correctly convert lbs to kg', function() {
            assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
        });

        test('should correctly convert kg to lbs', function() {
            assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
        });
    });

});
