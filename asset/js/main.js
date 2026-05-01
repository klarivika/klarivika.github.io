import { register_variable_styles } from "./util.js";
import { routes } from "./routes.js";
import { component_fetcher } from "./fetcher.js";
import { themes } from "./theme.js";
import { handle_routes } from "./routes_data.js";
import { $,All,video_internal } from "./util.js";

/**
 * @desc for update state for the hashchange listener and update its link for activate
 */
const nav_active_updater=()=>{
	const nav_links=$(".nav-container a",All)
	// console.log("test ",nav_links)
	nav_links.forEach(links=>{
		const parent=links.parentElement
		const icon=parent.querySelector("i")
		const link=links.getAttribute("href")
		const url=window.location.hash
		const is_active=link.toLowerCase().includes(url)
		if(is_active){
			icon.classList.add("before:bg-white")
			icon.classList.remove("before:bg-blue-900","text-white")
		}else{
			icon.classList.remove("before:bg-white")
			icon.classList.add("before:bg-blue-900","text-white")

		}
		// console.log("testing ",{is_active})
	})
}

const nav_comp=async({url})=>{
		if((document.querySelector(".nav-container").children.length)>0){
			return
		}
			const permited_url=["home","faq"]
		for(const key of Object.keys(handle_routes)){
			// console.log("data value key ",{key,full:Object.keys(handle_routes)})
				const values=key.replace("/#","").replace("#/","")
			if(!permited_url.includes(values)) continue
			// console.log("values ",values)
			const is_active=[values].some((val)=>url.hash.includes(val))
			await component_fetcher({
				component: "link",
				target: ".nav-container",
				prop:{link_to: values, link_name: values,icon:`file-break-fill before:content-[''] before:p-[12px]  before:rounded-[100%] before:min-w-[12px] after:min-h-[12px]`},
			});
		}
	}

const init_app = async () => {
	register_variable_styles({ themes });
	await component_fetcher({ component: "header", target: ".header" });
	await component_fetcher({
		component: "img",
		target: ".header-img-container",
		prop: {
			src: "img/main_media/klarivika banner2.jpeg",
			type: "web",
			alt: "header image",
			class: "w-full h-[23rem] md:h-[25rem] object-cover",
		},
	});
	await component_fetcher({
		component: "footer",
		target: ".footer",
		prop: { year: new Date().getFullYear() },
	});
	await component_fetcher({ component: "nav", target: ".nav" });
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
