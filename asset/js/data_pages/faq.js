import { component_fetcher } from "../fetcher.js";

const render_faq_data = async () => {
        // Implementation for rendering FAQ data
        const faq_datas=[
            {id:1,question:"What is Klarivika?", answer:"Klarivika is a platform that combat against misinformation and disinformation by providing users with accurate and reliable information. It serves as a resource for individuals seeking to verify the authenticity of news and information they encounter online."},
            {id:2,question:"what kind information klarivika want to inform us?", answer:"we deliver information like history, clarification fake news or manipulated information that has been viral in the internet so u can check the truth behind it"},
            {id:3,question:"history about klarivika?", answer:"we concern about manipulated information fake news that can be harmfull to each other"},
            {id:4,question:"how to detect fake news or manipulated information?", answer:"you must understand the history and context behind this information and before u spread it ask yourself what is history behind it , it is real or manipulated information and then use technology such as ai grock or chatgpt"},
            {id:5,question:"what i do when is recieve information?", answer:"you must check and re check to make sure the information is not fake ,manipulated or misleading try to understand the context behind it also history about the information that u recieve"},
        ]
        for(const [idx,data] of faq_datas.entries()){
            await component_fetcher({
                component: "accordion",
                target: ".faq-container",
                prop:{...data},
            });
            await component_fetcher({
                component: "icon",
                target: ()=>{
                    const all=document.querySelectorAll(`.faq-container .icon-container`)
                    return all[idx]
                },
                prop:{icon:"chevron-down text-lg transition-all duration-300 group-data-[open=true]:rotate-180"},
            })
        }
    };

    export {
        render_faq_data
    }