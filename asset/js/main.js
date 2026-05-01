import { register_variable_styles } from "./util.js";
import { routes } from "./routes.js";
import { component_fetcher } from "./fetcher.js";
import { themes } from "./theme.js";
import { handle_routes } from "./routes_data.js";
import { $,All,video_internal } from "./util.js";
import { nav_active_updater,nav_comp,header_comp,footer_comp } from "./data_component/index.js";




const init_app = async () => {
	register_variable_styles({ themes });
	await header_comp()
	await footer_comp()
	// console.log("rooutes ");
	const url = window.location;
	if (url.hash === "") {
		url.hash = "/";
	}
	await nav_comp({url})
	 nav_active_updater()
	await routes({ routes: handle_routes })
	 document.addEventListener("renderSelesai", async() => {
        // console.log("Semua komponen sudah nempel, sekarang isi icon video!");
         await video_internal();
    }, { once: true })
};

export { init_app,nav_active_updater };
