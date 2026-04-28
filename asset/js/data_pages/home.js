import { fetcher_data,component_fetcher } from "../fetcher.js";

const render_home_data = async ({datas}) => {
        const is_empty_object=Object.keys(datas).length == 0?undefined:datas
        const home_data = await fetcher_data(datas)
        // console.log("HOME DATA =>", home_data);
        // console.log("HOME DATA =>", Object.keys(datas).length == 0);
        for (const item of home_data) {
            if (item.is_publish === false) {
                continue;
            }
            await component_fetcher({
                component: "card",
                target: ".card-container",
            });
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
                });
                await component_fetcher({
                    component: "link",
                    target: () =>
                        card.querySelector(
                            ".link-containers",
                        ),
                    prop: {
                        icon: "shield-fill-exclamation text-xl pb-3 border-b-3 border-white",
                        link_to: `home/${item.id}`,
                        link_name: "View Article",
                    },
                });
                const evidence=`evidence/${item.id}`
                await component_fetcher({
                    component: "link",
                    target: () =>
                        card.querySelector(
                            ".link-containers2",
                        ),
                    prop: {
                        icon: "shield-fill-exclamation text-xl pb-3 border-b-3 border-white text-white block",
                        link_to: `${evidence}`,
                        link_name: "View Article",
                    },
                })
                card.querySelector(".link-containers2").addEventListener("click",()=>{
                    // alert("nice")
                    window.location.hash=`${evidence}`
                })
                
            }
        }
    };

    export {render_home_data} 