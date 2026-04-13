import { component_fetcher, fetcher_data } from "./fetcher.js";
/**
 * @desc store and render databased on url query param
 * @param {object} datas
 */
const render_json_data = async (datas) => {
	const route_data = {
		home: "#home",
		faq: "#faq",
		evi: "#evidence",
	};
const nav_comp=async()=>{
	if((document.querySelector(".nav-container").children.length)>0){
		return
	}
		const permited_url=[route_data.home, route_data.faq]
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
		const home_data = await fetcher_data(datas);
		// console.log("HOME DATA =>", home_data);
		for (const item of home_data) {
			if (item?.is_publish === false) {
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
				card.querySelector(".jabatan").textContent=item.jabatan
				card.querySelector(".name").textContent=item.name
				card.querySelector(".status").textContent=item.status
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
						icon: "shield-fill-exclamation text-xl pb-3 border-b-3 border-white",
						link_to: `home/${item.id}`,
						link_name: "View Article",
					},
				});
				const evidence=`evidence/${item.id}`
				await component_fetcher({
					component: "link",
					target: () =>
						card.querySelector(
							".link-containers2",
						),
					prop: {
						icon: "shield-fill-exclamation text-xl pb-3 border-b-3 border-white text-white block",
						link_to: `${evidence}`,
						link_name: "View Article",
					},
				})
				card.querySelector(".link-containers2").addEventListener("click",()=>{
					// alert("nice")
					window.location.hash=`${evidence}`
				})
				
			}
		}
	};
	const render_faq_data = async () => {
		// Implementation for rendering FAQ data
		const faq_datas=[
			{id:1,question:"What is Klarivika?", answer:"Klarivika is a platform that combat against misinformation and disinformation by providing users with accurate and reliable information. It serves as a resource for individuals seeking to verify the authenticity of news and information they encounter online."},
		]
		faq_datas.forEach(async(data)=>{
			await component_fetcher({
				component: "accordion",
				target: ".faq-container",
				prop:{...data},
			});
			await component_fetcher({
				component: "icon",
				target: ()=>document.querySelector(`.faq-container .icon-container`),
				prop:{icon:" bi-chevron-down text-lg transition-all duration-300 group-data-[open=true]:rotate-180"},
			})
		})
	};

	// end render pages
	//route logic start
	if (window.location.hash === route_data.home) {
		await render_home_data();
	}
	if (window.location.hash === route_data.faq) {
		await render_faq_data();
	}
	//route logic end
};

export { render_json_data };
