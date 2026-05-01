
import { component_fetcher } from "../fetcher.js";
const header_comp=async()=>{
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
}


export{
    header_comp
}