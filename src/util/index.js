import * as THREE from "three";


/**
 * 缓存静态图片
 * @returns {object} 返回一个Promise,所有图片加载完成的时候为resolve 
 */
function cacheImages() {
    let images = ["mapd.jpg","back.jpg","mapb.png"];

    return () => {
        let caches = images.map(v => {
            return new Promise((resolve) => {
                let _img = new Image();
                _img.src = require("../assets/" + v);
                _img.onload = () => resolve(_img);
            })
        });
        return Promise.all(caches);
    }

}


export {    
    cacheImages
}