import { fetcher_data ,component_fetcher} from "../fetcher.js";
import {$,All} from "../util.js"
const render_document_view_data = async ({datas}) => {
		const data_evidence = await fetcher_data(datas);
		// $("")
		// console.log("HOME DATA =>", data_evidence);
		// console.log("HOME DATA2 =>", datas);
		const data_evidence_validate_less_than1=data_evidence.length < 1
		if(data_evidence_validate_less_than1){
			$(".not-found-data-json").classList.remove("hidden")
		}
		if(data_evidence_validate_less_than1){
			// alert("nice ")
			const [key,value]=Object.entries(datas)[0]
			// console.log("radical kunai ",{key,value})
			await component_fetcher({
				component: "text",
				target: ".error-identifier",
				prop:{
					content:`${key} ${value}`,
					text_type:"span",
				}
			});
		}
		// console.log("data evidence ",data_evidence)
		for (const item of data_evidence) {
			const component_render_md=document.querySelector(".md-docs zero-md")
				item.storybook="./asset/data_klarifikasi/"+item.storybook
			component_render_md.setAttribute("src",item.storybook)	
			await component_fetcher({
				component: "card",
				target: ".card-container",
			});
		// data
		item['assets'].forEach(async(value,idx) => {
			// console.log("what is this ",value)
			if(value.type === 'video-yt'){
				await component_fetcher({
							component: "youtube",

							target: () =>$(".video-wrapper"),
							prop: {
								src:value.path.split("/").pop() 
							},
						});
				await component_fetcher({
							component: "link_out",

							target: () =>{
								const links=All(".youtube-text-wrapper")
								return links[idx]
							},
							prop: {
								icon:"link text-xl hidden md:block",
								link_name:"source",
								link_to:value.path,
							},
						});
			}
			if(value.type === 'internal-video'){
				await component_fetcher({
							component: "video",

							target: () =>$(".video-wrapper"),
							prop: {
								src:`./asset/data_klarifikasi/${value.path}`
							},
						});
				await component_fetcher({
							component: "link_out",

							target: () =>{
								const links=All(".video-text-wrapper")
								return links[idx]
							},
							prop: {
								icon:"link text-xl hidden md:block",
								link_name:"source",
								link_to:value.path,
							},
						});
			}

		});
		const link_data=item['links']
		link_data.forEach(async(val)=>{
			await component_fetcher({
				component: "link_out",
				target: () =>$(".link-datas"),
				prop: {
					icon:"link text-xl",
					link_name:val.name,
					link_to:val.link,
				},
				});
		})
			// card
			const cards =
				document.querySelectorAll(
					".card",
				);
			for (const card of cards) {
				card.querySelector(".jabatan").textContent=item.jabatan
				card.querySelector(".name").textContent=item.name
				card.querySelector(".status").textContent=item.status
				await component_fetcher({
					component: "img",
					target: () =>
						card.querySelector(
							".image-poster",
						),
					prop: {
						src:item.picture,
						alt:"none",
						type:"data_klarifikasi",
						class:"fit-cover size-cover h-full w-full" 
					},
				});
				await component_fetcher({
					component: "img",
					target: () =>
						card.querySelector(
							".avatar",
						),
					prop: {
						src:item.picture,
						alt:"none",
						type:"data_klarifikasi",
						class:" fit-cover size-cover w-full h-full" 
					},
				});
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
				})
				card.querySelector(".link-containers2").classList.add("hidden")
				card.querySelector(".save-icon").classList.add("hidden")
				
			}
		}
	};

    export{
        render_document_view_data
    }