import { component_fetcher } from "../fetcher.js";

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

    export {
        render_faq_data
    }