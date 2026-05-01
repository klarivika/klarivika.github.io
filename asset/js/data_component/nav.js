import { $ ,All} from "../util.js"
import { handle_routes } from "../routes_data.js"
import { component_fetcher } from "../fetcher.js"
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
	await component_fetcher({ component: "nav", target: ".nav" })
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

export {
    nav_active_updater,
    nav_comp
}