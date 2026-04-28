import { component_fetcher, fetcher_data } from "./fetcher.js";
import {$} from './util.js'
import { render_home_data,render_evidence_data,render_faq_data } from "./data_pages/index.js";
/**
 * @desc store and render databased on url query param
 * @param {object} datas
 */
const render_json_data = async (datas) => {
	const route_data = {
		home: "#home",
		faq: "#faq",
		evidence: "#evidence",
	}

	// end render pages
	//route logic start
	const url8=window.location.hash
		// console.log("url 8 adalah ",url8)
	if (url8.includes("#/")) {
		await render_home_data({datas});
	}
	if (url8.includes(route_data.home)) {
		await render_home_data({datas});
		//id masih cache harusnya refresh id untuk pembaruan data
		// console.log("perbaikan dom ",{url8,datas})
	}
	if (url8.includes(route_data.faq)) {
		await render_faq_data({datas});
	}
	if (url8.includes(route_data.evidence) ) {
		await render_evidence_data({datas});
		// console.log("datas is ",datas)
	}
	//route logic end
};

export { render_json_data };
