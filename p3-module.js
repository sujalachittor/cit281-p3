/*
    CIT 281 Project 3
    Name: Sujala Chittor
*/
function validDenomination(coin){
    let validDenomination = [1, 5, 10, 25, 50, 100];
    if (validDenomination.indexOf(coin) >= 0) {
        return true;
    } else {
        return false;
    }
}

function valueFromCoinObject(obj) {
    let {denom, count} = obj;
    if (denom == undefined) {
        denom = 0;
    }
    if (count == undefined) {
        count = 0;
    }
    if (validDenomination(denom)) {
        return denom * count;
    } else {
        return 0;
    }
}
function addValue(currentvalue, nextobject) {
    return currentvalue + valueFromCoinObject(nextobject);
}
function valueFromArray(arr) {
    let sum = arr.reduce(addValue, 0);
    return sum;
}

function coinCount(...coinage) {
    return valueFromArray(coinage);
}

module.exports.coinCount = coinCount
console.log("{}", coinCount({denom: 5, count: 3}));
console.log("{}s", coinCount({denom: 5, count: 3},{denom: 10, count: 2}));
const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
module.exports.coins = coins;
console.log("...[{}]", coinCount(...coins));