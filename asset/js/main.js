import {  register_variable_styles } from "./util.js";
import { routes } from "./routes.js";
import {component_fetcher} from "./fetcher.js";
import { themes } from "./theme.js";
// import {route_data} from "./routes_data.js";

const init_app=async()=>{
     register_variable_styles({themes})
        
        await component_fetcher({component: "header", target: ".header"});
        await component_fetcher({component: "img", target: ".header-img-container",prop:{src: "img/main_media/klarivika banner2.jpeg",type:"web", alt: "header image", class: "w-full h-[23rem] md:h-[25rem] object-cover"}});
        await component_fetcher({component: "footer", target: ".footer",prop:{year: new Date().getFullYear()}});
        await component_fetcher({component: "nav", target: ".nav"});
        const handle_routes={
          "/#home": {
            page:"home",
            title:" home",
            description:""
          },
          "/#faq": {
            page:"faq",
            title:" frequently asked questions",
            description:""
          },
          "/#evidence/:id": {
            page:"evidence",
            title:" evidence",
            description:""
          },
          "/#404": {
            page:"not-found",
            title:"page not found 404",
            description:"",
          },
        }
        routes({routes: handle_routes});
}


export{
    init_app
}