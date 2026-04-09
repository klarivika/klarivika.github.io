import {  register_variable_styles } from "./util.js";
import { routes } from "./routes.js";
import {component_fetcher} from "./fetcher.js";
import { themes } from "./theme.js";

const init_app=()=>{
     register_variable_styles({themes})
        
        component_fetcher({component: "header", target: ".header"});
        component_fetcher({component: "img", target: ".header-img-container",prop:{src: "img/main_media/klarivika banner2.jpeg",type:"web", alt: "header image", class: "w-full h-[23rem] md:h-[25rem] object-cover"}});
        component_fetcher({component: "footer", target: ".footer",prop:{year: new Date().getFullYear()}});
        component_fetcher({component: "nav", target: ".nav"});
        const handle_routes={
          "/#home": "home",
          "/#faq": "faq",
          "/#evidence/:id": "evidence",
          "/#404": "not-found",
        }
        routes({routes: handle_routes});
}


export{
    init_app
}