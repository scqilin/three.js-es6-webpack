import "../css/index.css"

import * as THREE from "three"
import * as dat from "dat.gui"
import OrbitControls from 'three-orbitcontrols'
import consts from "../consts"
import State from "../util/state"

import WEBGL from "../util/WebGL"


let { innerWidth: WIDTH, innerHeight: HEIGHT } = window
let { scene, camera, renderer } = consts, state = new State()
let clock = new THREE.Clock()
let controls

document.body.appendChild(state.domElement)

let div_WebGL = document.createElement('div')
div_WebGL.id = 'webgl-output'
document.body.appendChild(div_WebGL)
let container = document.getElementById('webgl-output')
let b1, b2, b3, b4;
if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}


class DrBaseScene {

    static getInstance(){
        if(!DrBaseScene.instance){
            DrBaseScene.instance = new DrBaseScene()
        }
        return DrBaseScene.instance
    }   
    constructor() {       
        this.animate = this.animate.bind(this) //绑定this的指向
        this.init()
    }
    // 上面是分开写 下面是在一起写 上面写法有优势
    // constructor() {
    //     if(!DrBaseScene.instance){
    //         this.animate = this.animate.bind(this) //绑定this的指向
    //         this.init() 
    //         DrBaseScene.instance = this
    //     }
    //     return DrBaseScene.instance           
    // }

    init() {
        this.setScene()
        this.setGUI()
        this.setCamera()
        this.addAxis()
        // this.car()
        this.iniPlane()
        this.setLights()
        this.setRender()
        this.orbitControls()
        this.animate()
        this.windowResize()
        // this.drawCube(100, 0, 50, 0)
    }
   
    setScene() {
        scene = new THREE.Scene();
    }    

    setGUI() {
        const gui = new dat.GUI();
    }
    

    setCamera() {
        camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 2000);
        camera.position.x = 0;
        camera.position.y = 150;
        camera.position.z = 180;
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
        //camera.lookAt(scene.position);
    }
    iniPlane() {
        let planeGeo = new THREE.PlaneGeometry(200, 200);
        let planeMat = new THREE.MeshPhongMaterial({ color: 0x999999 });
        let plane = new THREE.Mesh(planeGeo, planeMat);
        plane.receiveShadow = true;
        plane.position.y = -0.01;
        plane.rotation.x = -0.5 * Math.PI;
        scene.add(plane);
        let grid = new THREE.GridHelper(200, 20, 0x000000, 0x000000);
        grid.material.transparent = true;
        grid.material.opacity = 0.3;
        scene.add(grid);
    }

    setRender() {
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
        });
        renderer.setSize(WIDTH, HEIGHT);
        renderer.setClearColor(0x220022, 1);
        container.appendChild(renderer.domElement);
    }
    addAxis() {
        scene.add(new THREE.AxesHelper(20))
    }

    setLights() {
        let light = new THREE.AmbientLight(0x666666);
        scene.add(light);
        light = new THREE.SpotLight(0x999999, 4, 200, 2);
        light.position.set(0, 150, 50);
        scene.add(light);
        light = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
        light.position.set(0, 200, 0);
        scene.add(light);
    }

    animate() {
        requestAnimationFrame(this.animate);
        this.render(); //需要绑定this的指向
    }
    // animate = () => {
    //     requestAnimationFrame(this.animate);
    //     this.render()
    // }

    orbitControls() {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.autoRotateSpeed = 0.2;
        controls.enableDamping = true;//阻尼 阻尼系数
        controls.dampingFactor = 0.4;
        controls.enableZoom = true;
        controls.minDistance = 5;
        controls.maxDistance = 1000;
        // controls.enablePan = false;//右键拖拽
    }

    render() {
        let delta = clock.getDelta();
        renderer.render(scene, camera);
        state.update();
        // controls.update(delta);
    }

    windowResize() {
        window.addEventListener('resize', onWindowResize, false);
        function onWindowResize() {
            let {
                innerWidth: width,
                innerHeight: height
            } = window;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }

    }

    drawCube(r, x, y, z) {
        let cubeGeo = new THREE.BoxGeometry(r, r, r);
        let imgurl = require('../assets/back.jpg')
        let maps1 = new THREE.TextureLoader().load(imgurl);
        let cubeMat = new THREE.MeshStandardMaterial({
            map: maps1,
            transparent:true,
            opacity:0.8,
            // emissive:0x999999, //放射光
            roughness: 0.1, // 反射 1
            metalness:0.5 //折射 0.98

        });
        let cube = new THREE.Mesh(cubeGeo, cubeMat);
        cube.position.set(x, y, z);
        cube.castShadow = true;
        scene.add(cube);
        return cube;
    }

    cubeDr(a, b, c, x, y, z) {
        var cubeGeo = new THREE.BoxGeometry(a, b, c);
        var cubeMat = new THREE.MeshPhongMaterial({
            color: 0xfff000 * Math.random()
        });
        var cube = new THREE.Mesh(cubeGeo, cubeMat);
        cube.position.set(x, y, z);
        cube.castShadow = true;
        //scene.add(cube);
        return cube;
    }
    sphereDr(r, x, y, z) {
        var geometry = new THREE.SphereGeometry(r, 32, 32);
        var material = new THREE.MeshPhongMaterial({
            color: 0x33ccff,
        });
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        scene.add(mesh);
        return mesh;
    }

   
  
}


export {DrBaseScene,scene, camera, renderer,state}


