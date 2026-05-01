import { fetcher_data ,component_fetcher} from "../fetcher.js";
import {$,All,read_docx} from "../util.js"
const render_document_view_data = async ({datas}) => {
		const data_evidence = await fetcher_data(datas);
		// $("")
		// console.log("HOME DATA =>", data_evidence);
		// console.log("HOME DATA2 =>", datas);
		const data_evidence_validate_less_than1=data_evidence.length < 1
		
		if(data_evidence_validate_less_than1){
			$(".not-found-data-json").classList.remove("hidden")
			// alert("nice ")
			const [key,value]=Object.entries(datas)[Object.keys(datas).indexOf("id")]
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
		const data_docs=data_evidence[0]['assets']
		,data_type_param=datas.type
		,data_doc_id_param=datas.doc_id
			//kalau :doc_id tidak ditemukan
		const validate=data_docs.filter(val=>val.id == data_doc_id_param && val.type ==data_type_param)
		const show_details_error=async()=>{
			$(".not-found-data-json").classList.remove("hidden")
			$(".link-documents").classList.add("hidden")
			// validate
			// alert("nice ")
			let validate_param_based_condition
			if(validate.length<1)validate_param_based_condition="doc_id"
			if(data_type_param !='pdf' || data_type_param !='docx')validate_param_based_condition="type"

			// console.log("data evidence ",{data_docs,datas,validate})
			const [key,value]=Object.entries(datas)[Object.keys(datas).indexOf(validate_param_based_condition)]
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
		//kalau data validate tidak cocok dengan typenya maka error 
		// kalau typenya bukan pdf
		const allowedTypes = ['pdf', 'docx'];
		if( !allowedTypes.includes(data_type_param) || validate.length<1){
			show_details_error()
			
		}else{
			$(".not-found-data-json").classList.add("hidden")
			$(".link-documents").classList.remove("hidden")
			//display data
		if(data_type_param =='pdf'){
			for(const val of validate){
				// console.log("siapa ",val)
				val.path=`./asset/data_klarifikasi/${val.path}`
				await component_fetcher({
					component: "viewer_js",
					target: ".document-container-display",
					prop:{
						src:`${val.path}`
					}
				});
			}

			}else if(data_type_param == "docx"){
				// $(".document-container-display").innerHTML="hola"
				for(const val of validate){
				// console.log("siapa ",val)
				val.path=`./asset/data_klarifikasi/${val.path}`
				read_docx({res:({res})=>{
					// console.log("resultat ",res)
					$(".docx-display").innerHTML=res
				},url:val.path})
			}
		}
	
		// link-documents
		await component_fetcher({
			component: "link",

			target: () =>{
				return $(".link-documents")
			},
			prop: {
				icon:"backspace text-xl",
				link_name:"back",
				// /#document/:doc_id/topic/:id/view/:type
				link_to:`evidence/${datas.id}`,
			},
		});
		
	};
}

    export{
        render_document_view_data
	}