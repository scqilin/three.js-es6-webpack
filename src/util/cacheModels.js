// import * as THREE from "three"; //不行
const THREE = require('three');
require('three-obj-loader')(THREE)
require('three-ply-loader')(THREE)


// obj模型缓存 
function objLoader(){
    let objs = ["tree.obj","emerald.obj"]
    return () => {
        let caches = objs.map(v => {
            return new Promise((resolve) => {
                (new THREE.OBJLoader()).load(require('../assets/'+v), (obj)=> {
                    let geo = obj.children[0].geometry;
                    geo.computeBoundingSphere();
                    resolve(geo)
                })
            })
        });
        return Promise.all(caches);
    }
}
// ply模型缓存 
function plyLoader(){
    let objs = ["tree.ply","Lucy100k.ply"]
    return () => {
        let caches = objs.map(v => {
            return new Promise((resolve) => {
                (new THREE.PLYLoader()).load(require('../assets/'+v), (obj)=> {
                    // console.log(obj)
                    let geo = obj;
                    geo.computeBoundingSphere();
                    geo.computeVertexNormals ()
                    resolve(geo)
                })
            })
        });
        return Promise.all(caches);
    }
}

export { objLoader,plyLoader }   
