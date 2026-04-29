import { component_fetcher } from "./fetcher.js";
/**
 * @desc manipulate the dom 
 * @param {string} selector 
 * @param {function} cb 
 */
const $= (selector,cb) =>typeof cb === 'function' ? cb(selector) : document.querySelector(selector);
/**
 * @desc manipulate the dom 
 * @param {string} selector 
 */
const All= (selector) =>document.querySelectorAll(selector);




/**
 * @desc register themes colors and insert it to element root
 * @param {object} themes 
 */
const register_variable_styles=({themes})=>{
            const themes2=Object.entries(themes)
        //console.log(themes2);
            themes2.forEach(([key,value])=>{
                document.documentElement.style.setProperty(`--${key}`, value);
            })
}

/**
 * @desc create custom elements
 * @param {object} t 
 * @param {string} t.name 
 * @param {string} t.html 
 */
const custom_element_creator=({name,html})=>{
    class CustomElement extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            this.innerHTML = html;
        }
        static get observedAttributes() {
            return ['',''];
        }
    }
    customElements.define(name, CustomElement);
}





const video_internal=async()=>{
    const icon_target=$(".icon-play-container")
    
    // console.log("console target ",icon_target)
    if(icon_target){
        await component_fetcher({
            // path_to_component:"../components/",
            component: "icon",
    
            target: () =>{
                const icon=$(".icon-play-container")
                return icon
            },
            prop: {
                icon:"play-btn-fill text-xl text-white"
            },
        });
    }
   if (!window.videoListenerRegistered) {
    const container_video = $(".video-internal");

if (container_video) {
    const video_internal = container_video.querySelector("video")
    const max_duration = container_video.querySelector(".max-duration")
    const bar_duration=container_video.querySelector(".bar-duration")
    // Fungsi untuk memformat waktu agar cantik (00:00:00)
    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        const pad = (num) => String(num).padStart(2, '0');

        return hours > 0 
            ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` 
            : `${pad(minutes)}:${pad(seconds)}`;
    };

    const updateDuration = () => {
        if (video_internal.duration) {
            max_duration.innerText = formatTime(video_internal.duration);
            bar_duration.max=video_internal.duration
            bar_duration.value=0
        }
    };

    // 1. Jalankan jika metadata sudah terlanjur dimuat (cache)
    if (video_internal.readyState >= 1) {
        updateDuration()
    }

    // 2. Jalankan saat metadata baru selesai dimuat
    video_internal.addEventListener("loadedmetadata", updateDuration);
    video_internal.addEventListener("timeupdate", ()=>{
        const current_duration=container_video.querySelector(".current-duration")
            current_duration.innerText=formatTime(video_internal.currentTime)
            bar_duration.value=video_internal.currentTime
    });

    bar_duration.addEventListener("input",()=>{
        video_internal.currentTime=bar_duration.value
    })

}
        document.addEventListener("click", async(e) => {
           
            // Mencari elemen terdekat yang punya class .btn
            const btn = e.target.closest(".btn") || e.target.closest("video") ;
            if (btn) {
                // Cari video yang satu level (sibling) atau di dalam parent yang sama
                const container = btn.closest(".relative");
                const video = container ? container.querySelector("video") : null;
                
                if (video) {
                    if (video.paused) {
                        video.play()
                        // duration
                        
                            console.log("video ",video)
                        // Opsional: ganti icon jadi pause di sini
                        if(icon_target){
                            $(".icon-play-container").innerHTML=""
                            await component_fetcher({
                                // path_to_component:"../components/",
                                component: "icon",
                        
                                target: () =>{
                                    const icon=$(".icon-play-container")
                                    return icon
                                },
                                prop: {
                                    icon:"pause-btn-fill text-xl text-white"
                                },
                            });
                        }
                    } else {
                        video.pause();
                        if(icon_target){
                            $(".icon-play-container").innerHTML=""
                            await component_fetcher({
                                // path_to_component:"../components/",
                                component: "icon",
                        
                                target: () =>{
                                    const icon=$(".icon-play-container")
                                    return icon
                                },
                                prop: {
                                    icon:"play-btn-fill text-xl text-white"
                                },
                            });
                        }
                    }
                }
            }
        });
        window.videoListenerRegistered = true;
    }

}



export{
    $,
    All,
    register_variable_styles,
    video_internal
}