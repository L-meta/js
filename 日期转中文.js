/**
 * 面试时被问的一个问题, 至今没有好的思路
 * {
 *  问题 : "把一个new Date()转化为中央台报时(格式为二零一四年九月二十九日十一点五分零五秒, 时区与星期等忽略,注意零的位置, 只有秒和年中会出现零)",
 *  要求 : "代码尽可能短",
 *  提示 : "JS是弱类型语言, 数字转字符串是很容易的"
 *  }
 * 额, 代码尽可能短是个很模糊的界定, 求大家给个思路就好;
 * @author youmoo
 * @since 2014-09-29 11:44 AM
 * @param date 1.空,表示当前时间； 2.Date实例； 3.日期字符串,比如"2001-07-01 11:12:05"
 * @returns 字符串,日期的中文表示
 */
function format(date) {
    return ["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds"].map(function (fn, i) {

        var val = this["get" + fn]();
        fn === "Month" && (val += 1);//月份加一
        fn === "Seconds" && val > 0 && val < 10 && (val = "0" + val);//秒补零

        var zh = String(val).split("").map(function (v) {//数字转汉字
            return "零一二三四五六七八九"[v]
        });

        if (zh.length == 2) {//除年以外,其它字段长度都可能为2
            if (zh[1] === "零") {//10,20,30..
                if (zh[0] === "一") {//10 -> 十
                    zh = ["十"];
                } else {//20,30 -> 二十,三十
                    zh[1] = "十";
                }
            } else if (zh[0] === "一") {//11,12,13.. -> 十一,十二,十三
                zh[0] = "十";
            } else if (zh[0] !== "零") {//22,32.. -> 二十二,三十二
                zh[2] = zh[1];
                zh[1] = "十";
            }

        }
        return zh.join("") + ["年", "月", "日", "点", "分", "秒"][i];//补单位
    }, new Date(date || new Date())).join("")
}

console.log(format());
console.log(format("2001-07-01 11:12:05"));
console.log(format("2001-07-01 08:12:05"));
console.log(format("2001-10-10 11:12:00"));
console.log(format("1998-12-12 11:06:59"));
