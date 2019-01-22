export default class Format {
    static formatName(item) {
        var name = "";
        if (!item.LastName) {
            name = item.FirstName;
        }
        else if (!item.FirstName) {
            name = item.LastName;
        }
        else {
            name = item.LastName + ", " + item.FirstName;
        }
    
        if (item.MiddleName) {
            name += " " + item.MiddleName;
        }
    
        return name;
    }

    static formatMoney (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "" : t,
            s = n < 0 ? "-" : "",
            i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    static formatPhone (s) {
        var s2 = (""+s).replace(/\D/g, '');
        var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
    };
}

Number.prototype.formatMoney = function (c, d, t) {
    Format.formatMoney(c, d, t);
};