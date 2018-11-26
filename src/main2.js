import * as THREE from "three"
import { DrBaseScene, scene } from "./util/base"
import { objLoader, plyLoader } from "./util/cacheModels"


DrBaseScene.getInstance()

loobj()
async function loobj() {
    console.log(1);
    let objF = objLoader();
    let objs = await objF();
    console.log(objs);

    let mat = new THREE.MeshStandardMaterial({ color: 0xff3355 });
    let mesh = new THREE.Mesh(objs[0], mat);
    mesh.scale.set(80, 80, 80);
    let mesh1 = new THREE.Mesh(objs[1], mat);
    mesh1.rotation.z = Math.PI / 2
    mesh1.position.set(-40, 5, 0)
    scene.add(mesh);
    scene.add(mesh1);

    console.log(3);
    let plyF = plyLoader();
    let plys = await plyF();
    let mat2 = new THREE.MeshStandardMaterial({ color: 0xff88ff });
    let mesh2 = new THREE.Mesh(plys[1], mat2);
    console.log(plys[1]);
    mesh2.position.set(40, 24, 0)
    mesh2.rotation.y = Math.PI 
    mesh2.scale.set(.03, .03, .03);
    scene.add(mesh2);

}