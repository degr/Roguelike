export function normalizeText(str){
    if(!str)str = '';
    if(str.indexOf('_') > -1) {
        str = str.replace(/\_/g, ' ');
    }
    var regexp = /([a-z])([A-Z])/g;
    if(str.match(regexp)) {
        str = str.replace(regexp, '$1 $2');
    }
    if(str.indexOf(' ') > -1) {
        var p = str.split(' ');
        var out = '';
        for (var i = 0; i < p.length; i++) {
            if (!p[i])continue;
            out += p[i].charAt(0).toUpperCase() + p[i].substring(1) + (i !== p.length - 1 ? ' ' : '');
        }
        return out;
    } else {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
}
export function isDollarPrice(price){
    return price.match(/^\$?\s?(([1-9]\d{0,2}(,\d{3})*)|(([1-9]\d*)?\d))(\.\d\d)?$/);
}
export function toCsv(value) {
    if (value.indexOf("\"") != -1 || value.indexOf(",") != -1) {
        value = value.replace("\"", "\"\"");
        value = "\"" + value + "\"";
    }
    return value;
}
export function getUniqueValue(length){
    if(!length) {
        length = 5;
    } else {
        length -= 1;
    }
    return 'r' + (Math.random()*Math.pow(36, length) << 0).toString(36)
}

export default {
    normalizeText: normalizeText,
    isDollarPrice: isDollarPrice,
    toCsv: toCsv,
    getUniqueValue: getUniqueValue
};