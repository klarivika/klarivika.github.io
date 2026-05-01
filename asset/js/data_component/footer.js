import { component_fetcher } from "../fetcher.js";
const footer_comp=async()=>{
    const data_video=[
        {
            title:"fight fake news on social media",
            url:"https://youtu.be/3VycpUTeYto"
        }
    ]
    await component_fetcher({
		component: "footer",
		target: ".footer",
		prop: { year: new Date().getFullYear() },
	})
    for(const url of data_video){
        await component_fetcher({
            component: "youtube",
            target: ".footer-video-render",
            prop: { src:url.url.split("/").pop() },
        })
        await component_fetcher({
            component: "link_out",
            target: ".youtube-text-wrapper",
            prop: { 
                icon:"info-square-fill text-white" ,
                link_name:url.title,
                link_to:url.url 
            },
        })
    }

}


export{
    footer_comp
}