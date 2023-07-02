// var t = require("../../@babel/runtime/helpers/defineProperty"),
// a = require("../../utils/api"), 
// var e = require("../../utils/calendar"),
import {
	e
} from "/pages/calendar/calendar.js";
// i = require("../../utils/util"),
import {
	r as util
} from "../../utils/util.js"
// n = a.app;
const n = getApp();

export const ca = {
	// title: "",
	// desc: "",
	// nowDate: new Date(),
	// isDown: !1,
	// data: {
	//     ad: [],
	//     jiejiariData: {
	//         activeClass: "active",
	//         height: 0,
	//         time: 300,
	//         list: []
	//     },
	//     termData: {
	//         activeClass: "",
	//         height: 0,
	//         time: 300,
	//         list: []
	//     },
	//     hotData: {
	//         activeClass: "",
	//         height: 0,
	//         time: 300,
	//         list: []
	//     }
	// },
	// onLoad: function() {
	//     this.initPageData();
	// },
	removeHou: function(_t) {
		for (var ar = 0; ar < _t.length; ar++)
		 _t[ar].days.indexOf("今天") > -1 || _t[ar].days.indexOf("明天") > - 1 || _t[ar].days.indexOf("后天") > -1 || (_t[ar].days += "后");
		return _t;
	},
	initPageData: function(h) {
		//只执行一次&& !h.value.isDown
		if (n.globalData.festivalData) {
			var ja = [],
				he = [];
			h.value.isDown = !0;
			var i = new Date(h.value.nowDate.getFullYear(),
					h.value.nowDate.getMonth(),
					h.value.nowDate.getDate()),
				r = 0;
			var s = this.getJieri(i);
			console.log(s, 'sf');
			for (ja = ja.concat(s.vacationList), he = he.concat(s.hotList); r < 365;) {
				i.setDate(i.getDate() + 1);
				s = this.getJieri(i);
				ja = ja.concat(s.vacationList);
				he = he.concat(s.hotList), r++;
			}
			console.log(ja, 'jiejiari');
			console.log(he, 'jieqi');
			
			h.value.data.allHolidays = ja.concat(he);
			h.value.data.allHolidays.sort((a,b)=>{
				return a.num - b.num;
			})
			h.value.data.allHolidays.forEach((element)=>{
				element.date = element.date.replace("年",'-').replace('月','-').replace("日",'');
			})
			let c = h.value.data.allHolidays.filter((element)=>{
				let m = element.date.slice(-5,-3);
				let y = element.date.slice(-10,-6);
				if(y){
					return m-0 == h.value.nowMonth && y == h.value.nowYear;
				}else{
					return m-0 == h.value.nowMonth && h.value.nowYear == new Date().getFullYear();
				}
			})
			console.log(c,'cno');
			h.value.data.allHolidays = c;
			
			this.removeHou(he),
			this.removeHou(ja),

			h.value.data.jiejiariData.time = 40 * ja.length;
			h.value.data.jiejiariData.height = 67 * ja.length;
			h.value.data.jiejiariData.list = ja;
			h.value.data.hotData.time = 10 * he.length;
			h.value.data.hotData.list = he;

			ja[0].num <= he[0].num ? h.value.title = ja[0].days + "后是" + ja[0].name : h.value.title = he[0]
				.days +
				"后是" + he[0].name;

			if (ja[0].num == 0) {
				h.value.title = ja[0].days + '是' + ja[0].name
			}
			if (he[0].num == 0) {
				h.value.title = he[0].days + '是' + he[0].name
			}
			if (ja[0].num == 0 && he[0].num == 0) {
				h.value.title = ja[0].days + '是' + ja[0].name + '、' + he[0].name
			}
		}
	},

	getJieri: function(t) {
		var a = t.getFullYear(),
			r = t.getMonth(),
			s = t.getDate(),
			o = e.solar2lunar(a, r, s),
			l = o.lYear,
			g = o.lMonth,
			h = o.lDay;
		r += 1;
		var D = (g < 10 ? "0" + g : g.toString()) + (h < 10 ? "0" + h : h.toString()),
			d = (r < 10 ? "0" + r : r.toString()) + (s < 10 ? "0" + s : s.toString()),
			c = [],
			f = [],
			u = this.getDaysInterval(t),
			v = a === (new Date()).getFullYear() ? util.formatDate(t, "MM月dd日") : util.formatDate(t,
				"yyyy年MM月dd日"),
			m = n.globalData.festivalData.S[d],
			y = {};
		if (m && m.length > 0)
			for (var p = 0; p < m.length; p++) a >= parseInt(m[p].Y, 10) && ((y = {
				P: parseInt(m[p].P, 10),
				name: m[p].V,
				date: v,
				days: u.intervalDay,
				num: u.intervalTime
			}).P >= 10 ? c.push(y) : f.push(y));
		var T = n.globalData.festivalData.L[D];
		if (T && T.length > 0)
			for (var w = 0; w < T.length; w++) l >= parseInt(T[w].Y, 10) && ((y = {
				P: parseInt(T[w].P, 10),
				name: T[w].V,
				date: v,
				days: u.intervalDay,
				num: u.intervalTime
			}).P >= 10 ? c.push(y) : f.push(y));
		var M = this.getWeekIndexString(a, r, s),
			P = n.globalData.festivalData.W[M];
		if (P && P.length > 0)
			for (var b = 0; b < P.length; b++)(y = {
				P: parseInt(P[b].P, 10),
				name: P[b].V,
				date: v,
				days: u.intervalDay,
				num: u.intervalTime
			}).P >= 10 ? c.push(y) : f.push(y);
		return o.isTerm && "清明" === o.Term && c.push({
			P: 8,
			name: o.Term,
			date: v,
			days: u.intervalDay,
			num: u.intervalTime
		}), {
			vacationList: c,
			hotList: f
		};
	},
	getWeekIndexString: function(t, a, e) {
		var i = Math.ceil(e / 7),
			n = new Date(t, a - 1, e).getDay();
		return (a < 10 ? "0" + a : a.toString()) + i + n;
	},
	getDaysInterval: function(t) {
		var a = Math.ceil((t.getTime() - (new Date()).getTime()) / 864e5);
		return {
			intervalDay: 0 === a ? "今天" : 1 === a ? "明天" : a + "天",
			intervalTime: a
		};
	},
};