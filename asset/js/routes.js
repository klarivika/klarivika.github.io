import { page_fetcher } from "./fetcher.js";
import { render_json_data } from "./pages.js";
import { pointings_images_video_elements } from "./pointing.js";
let curent_hash = "";


const query_param_fetcher=({routes,datas,get_data=null})=>{
	//? cari tahu apakah bisa \:\w+
	const dataroutes=routes
	const url=datas.url
	const url2=url.split("/")[0]
	const url3=url.split("/")
	//ambil routes saat ini
	const get_routes_datas=Object.keys(dataroutes) 
	const get_routes_now=get_routes_datas[get_routes_datas.findIndex(key=>key.startsWith("/"+url2))].slice(1) // evidence/:id
			const regex_route=/\:\w+/g
		if(regex_route.test(get_routes_now)){
			get_routes_now.match(regex_route)?.map(val=>{
				const route_val=get_routes_now.split("/")
				const route_value=url3[route_val.indexOf(val)]
				const get_key_param=val.replace(":","")
				// console.log("get routes ",{route_val,get_key_param,route_value})
				//  console.log("testing ",{get_key_param,get_val_param2})
				if(typeof get_data ==='function'){
					get_data({key:get_key_param,value:route_value,url:url2})
				}
			})
		}
}

/**
 * @desc create route
 * @param {object} t
 * @param {object} t.routes
 */
const routes = ({ routes }) => {
	// Listen for hash changes
	let data_params = {}; //id=> 2
	window.addEventListener("hashchange", async () => {
		// console.log("HASH CHANGE TRIGGERED");
		//cegah reload jika pathname sama
		const new_hash = "/" + window.location.hash
		if (curent_hash == window.location.hash) return
		curent_hash = new_hash
		//cocokan dengan routes jika tidak maka lempar ke page not found
		const routes_get_keys =Object.keys(routes)[
				Object.keys(routes).findIndex((key) =>key.startsWith("/" +window.location.hash.split("/",)[0],),)]; //route saat ini /#home
				// console.log("route get key ",routes_get_keys) // /#home
		let get_query_param_url_if_exist = window.location.hash;
		// console.log("routes get keys ",routes_get_keys)
		if (/\:\w+/g.test(routes_get_keys)) {
			//routes get keys jadikan objects
			//merubah data params menjadi object dengan key nama param dan value dari url {id:1}
			routes_get_keys.match(/\:\w+/g)?.map((param) => {
					const array_routes =routes_get_keys.split("/"); //array route saat ini
					const get_index_of_key_params =array_routes[array_routes.findIndex((key) =>key === param)].substring(1); //:id => id
					const url ="/" +window.location.hash; //.split("/")
					const value_param =url.split("/")[
							array_routes.indexOf(":" +get_index_of_key_params)
						]; //value from parameter like routes=home/:id  url=home/1
						// console.log("value param ",get_index_of_key_params)
					data_params[get_index_of_key_params] = value_param;
					// console.log("testing bang ",{value_param,url,data_params})
					// console.log("urlnya ",url.split("/"))
				});
			get_query_param_url_if_exist =routes_get_keys.substring(1)
			// console.log("data query param ",routes_get_keys)
		}
		console.log("data data param " +get_query_param_url_if_exist)
		
		// console.log("data params ",data_params)
		const url =routes["/" +get_query_param_url_if_exist] ?? routes["/#404"];
		//kene ki
		await page_fetcher({ page: url, target: ".outlet" });
		//fetcher data di route tertentu saja untuk menghemat resource karena tidak semua page membutuhkan data yang sama
		//in there are alot of page that need data from routes in function below
		await render_json_data(data_params);
		// make dinamyc pointings
		pointings_images_video_elements();

	});
	// Handle the load event
	const handle_load = async () => {
		// Trigger the initial route based on the current hash
		// console.log("load CHANGE TRIGGERED");
		const url = window.location.hash;

		// console.log("no bug baby ",url)
		//kalau url saat ini kosong berarti render halaman home atau pertama
		let initialUrl = routes[Object.entries(routes)[0][0]];
		//kalaiu url tidak kosong maka load yang sudah ada di url
		if (url !== "") {
			const dataroute = Object.keys(routes)
			initialUrl =routes[dataroute[dataroute.findIndex((key) =>key.startsWith("/" +url.split("/")[0]))]]; //route saat ini misal evidence tanpa param :id
			// console.log("dataroute ",initialUrl)
			// console.log("url ",url.split("/")[0])
			query_param_fetcher({routes,datas: {url},get_data:({key,value,url})=>{
				console.log("ricek ",{key,value,url})
				data_params[key]=value
			}})
		}
		query_param_fetcher({routes,datas: {url},get_data:({key,value})=>{
			// console.log({key,value})
			data_params[key]=value
		}})
		// query_param_fetcher(url)
		await page_fetcher({
			page: initialUrl,
			target: ".outlet",
		});
		//initial render data
		await render_json_data(data_params);
		// make dinamyc pointings
		pointings_images_video_elements();
	};

	if (document.readyState === "loading") {
		window.addEventListener("load", handle_load);
	} else {
		// Document is already loaded
		handle_load();
	}
};

export { routes };
