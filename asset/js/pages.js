import { component_fetcher, fetcher_data } from "./fetcher.js";
/**
 * @desc store and render databased on url query param
 */
const render_json_data = async () => {
	const route_data = {
		home: "#home",
		faq: "#faq",
		about: "#about",
		evi: "#evidence",
	};
const nav_comp=async()=>{
	if((document.querySelector(".nav-container").children.length)>0){
		return
	}
		const permited_url=[route_data.home, route_data.faq, route_data.about]
	for(const [key, value] of Object.entries(route_data)){
			const values=value.replace("#","")
		if(!permited_url.includes(value)) continue
		await component_fetcher({
			component: "link",
			target: ".nav-container",
			prop:{link_to: values, link_name: key},
		});
	}
}
nav_comp()
	// start render pages
	const render_home_data = async () => {
		const home_data = await fetcher_data();
		for (const item of home_data) {
			if (item.is_publish === false) {
				continue;
			}
			await component_fetcher({
				component: "card",
				target: ".card-container",
			});
			const cards =
				document.querySelectorAll(
					".card",
				);
			for (const card of cards) {
				await component_fetcher({
					component: "icon",
					target: () =>
						card.querySelector(
							".save-icon",
						),
					prop: {
						icon: "heart text-2xl text-gray-500 transition-all duration-400 hover:text-[var(--dark)] hover:cursor-pointer",
					},
				});
				await component_fetcher({
					component: "icon",
					target: () =>
						card.querySelector(
							".permata-container",
						),
					prop: {
						icon: "gem text-2xl text-gray-500 transition-all duration-400 hover:text-[var(--dark)] hover:cursor-pointer",
					},
				});
				await component_fetcher({
					component: "icon",
					target: () =>
						card.querySelector(
							".text-status .icon-status",
						),
					prop: {
						icon: "gem text-2xl text-gray-500 transition-all duration-400",
					},
				});
				await component_fetcher({
					component: "icon",
					target: () =>
						card.querySelector(
							".permata-container",
						),
					prop: {
						icon: "gem transition-all duration-700 absolute z-[-1] group-hover:z-[123] opacity-0 group-hover:opacity-100 group-hover:top-[5.25rem] top-[-1.10rem] right-[0] group-hover:right-[5.5rem] group-hover:rotate-[45deg]",
					},
				});
				await component_fetcher({
					component: "icon",
					target: () =>
						card.querySelector(
							".icon-placeholder",
						),
					prop: {
						icon: "shield-fill-exclamation text-xl",
					},
				});
				await component_fetcher({
					component: "link",
					target: () =>
						card.querySelector(
							".link-containers",
						),
					prop: {
						icon: "shield-fill-exclamation text-xl",
						link_to: "home",
						link_name: "View Article",
					},
				});
			}
		}
	};
	// end render pages
	//route logic start
	if (window.location.hash === route_data.home) {
		await render_home_data();
	}
	//route logic end
};

export { render_json_data };
