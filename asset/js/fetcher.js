/**
 * @desc fetch data from json and insert it to html
 * @param {object} datas 
 */
const fetcher_data=async(datas={})=>{
    try{
        //{id:1}
       const fetching_data=async (datas={})=>{
        const response=await fetch("./asset/data_json/data.json");
       const data=await response.json();
       data?.map((item)=>{
            //const manipulated_link_resource=
            item["assets"].forEach(item2=>{
                    item2['path']=`./asset/data_klarifikasi/${item2["path"]}`;
            })
            
        })
        
        if(Object.keys(datas).length === 0){
             //tembak ke outlet
            return data
        }
            return data
       }
       if(Object.keys(datas).length === 0){
           return await fetching_data()
           
       }

    }catch(err){

    }

}


/**
 * @desc fetches the components and returns the response insert it to dom
 * @param {string} url 
 * @param {string} target 
 * @param {object} prop 
 * @param {string} prop.icon 
 */
const component_fetcher = async ({component,target,prop=null}) => {
    try {
        const simplyfing_data=`${component}/${component}.html`
        const response = await fetch("./asset/components/"+simplyfing_data);
        let data = await response.text();
        if(prop){
            // Replace placeholders in the fetched HTML with actual prop values
            Object.entries(prop).forEach(([key, value]) => {
                data = data.replace(new RegExp(`{{${key}}}`, 'g'), value)
            });
        }
        if(typeof target === "function"){
            // console.log("testing target function ",target())
            target().innerHTML = data;
            return
        }
        document.querySelector(target).innerHTML += data;
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
        if(page_cache[page]){
            document.querySelector(target).innerHTML = page_cache[page];
            return 
        }
        
        const simplyfing_data=`${page}/${page}.html`
        const response = await fetch("./pages/"+simplyfing_data);
        const data = await response.text();
        //console.log("jaka ",data)
        page_cache[page]=data
        document.querySelector(target).innerHTML = data;
    }catch (error) {
        console.error("Error fetching page:", error);
    }

}

export {
    fetcher_data,
     component_fetcher,
     page_fetcher
}