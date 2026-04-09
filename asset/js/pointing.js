
/**
 * @desc handle image atau video element based on attribut
 * type atribute web[pointing ke asset] atau data_klarifikasi[pointing kesana] jika tidak ada maka harus dilakukan manual oleh webdev
 */
const pointings_images_video_elements=()=>{
    const select=document.querySelectorAll('img[type="web"], video[type="web"], img[type="data_klarifikasi"], video[type="data_klarifikasi"]');
    select.forEach((element)=>{
        // console.log("testing why fail ",element)
        const type=element.getAttribute('type');
        const src=element.getAttribute('src');
        if(type === "web"){
            if(src.includes("./asset/"))return
           // console.log("testing ",element.getAttribute('src'))
            element.src=`./asset/${src}`;
        }else if(type === "data_klarifikasi"){
            if(src.includes("./asset/data_klarifikasi"))return
            element.src=`./asset/data_klarifikasi/${src}`;
        }
    })
}

export {
    pointings_images_video_elements
}