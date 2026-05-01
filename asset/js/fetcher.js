// import { All } from "./util";

/**
 * @desc fetch data from json and insert it to html
 * @param {object} datas 
 */
const fetcher_data=async(datas={})=>{
    try{
        //{id:1}
        // console.log("datas from pages ", datas)
        // if(!datas)return
        const response=await fetch("./asset/data_json/data.json");
        const data=await response.json()
        
        const fetching_data=async (datas={})=>{
            data?.map((item)=>{
            //const manipulated_link_resource=
            item["assets"]?.forEach(item2=>{
                    item2['path']=`./asset/data_klarifikasi/${item2["path"]}`;
            })
            item['storybook']=`./asset/data_klarifikasi/${item['storybook']}`
        })
        // console.log("storybook ",data)
                
                //if data is empty then return data without fetch
        if(Object.keys(data).length === 0){
             //tembak ke outlet 
            return data
        }else{
            return data
        }
    } //end of function
   

       if(Object.keys(datas).length === 0){
           return await fetching_data()
           
    }else{
        return data.filter(item =>{
                // console.log("testuing ",item)
                return Object.entries(datas).some(([key,val])=> item[key] == val && item['is_publish'] === true)
            } )
            // console.log("chek up for data ",data)
       }

    }catch(err){
            // console.log("error "+err)
            return []
    }

}


/**
 * @desc fetches the components and returns the response insert it to dom
 * @param {string} url 
 * @param {string} target 
 * @param {object} prop 
 * @param {string} prop.icon 
 */
const component_fetcher = async ({component,target,prop=null,path_to_component=null}) => {
    try {
        const simplyfing_data=`${component}/${component}.html`
        const path_to_comp=path_to_component === null?"./asset/components/"+simplyfing_data:path_to_component+simplyfing_data
        const response = await fetch(path_to_comp);
        let data = await response.text();
        if(prop){
            // console.log("comp fetcher ",prop)
            // Replace placeholders in the fetched HTML with actual prop values
            Object.entries(prop).forEach(([key, value]) => {
                data = data.replace(new RegExp(`{{${key}}}`, 'g'), value)
            });
        }
        if(typeof target === "function"){
            const element = target();
            if (!element) {
                console.error(`Component fetcher target function returned null for component ${component}`);
                return;
            }
            element.innerHTML += data;
            return;
        }
        const element = document.querySelector(target);
        if (!element) {
            console.error(`Component fetcher could not find target selector '${target}' for component ${component}`);
            return;
        }
        element.innerHTML += data;
    }catch (error) {
        console.error("Error fetching component:", error);
    }

}


/**
 * @desc fetches the pages and returns the response insert it to dom
 * @param {string} page 
 * @param {string} target 
 */
const page_cache = {};
const page_fetcher = async ({page,target}) => {
    try {
        if(page_cache[page.page]){
            document.querySelector(target).innerHTML = page_cache[page.page];
            return 
        }
            // console.log("param page ",page)
        const simplyfing_data=`${page['page']}/${page['page']}.html`
        const response = await fetch("./pages/"+simplyfing_data);
        const data = await response.text();
        
        //console.log("jaka ",data)
        page_cache[page.page]=data
        document.querySelector(target).innerHTML = data; //cara menangkap param lalu direndder ke html ataupin js dari page
        //ambil query parameter 
    }catch (error) {
        console.error("Error fetching page:", error);
    }

}

export {
    fetcher_data,
     component_fetcher,
     page_fetcher
}