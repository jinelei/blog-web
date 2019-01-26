import Cookies from 'js-cookie'

export const TOKEN_KEY = 'token'
export const cookieExpires = 1

export const DateFormat = (date, format) => {
    if (typeof date === 'undefined')
        return ''
    try {
        date = new Date(date);
        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(format))
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return format;
    } catch (e) {
        return ''
    }
}

export const setTokenCookies = (token) => {
    Cookies.set(TOKEN_KEY, token, {expires: cookieExpires || 1})
}

export const getTokenCookies = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}
