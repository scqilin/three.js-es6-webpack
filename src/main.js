import "./css/index.css"
import * as fp from "lodash/fp"
import * as THREE from "three"
import * as dat from "dat.gui"
import OrbitControls from 'three-orbitcontrols'
import consts from "./consts"
import State from "./util/state"
// import OrbitControls from "./util/OrbitControls"
import { cacheImages } from "./util/cacheImages"
import WEBGL from "./util/WebGL"

let {
    innerWidth: WIDTH,
    innerHeight: HEIGHT
} = window, {
    scene,
    camera,
    renderer
} = consts,    
    controls,
    state = new State();
let clock = new THREE.Clock();
document.body.appendChild(state.domElement);

let div_WebGL = document.createElement('div')
div_WebGL.id = 'webgl-output'
document.body.appendChild(div_WebGL)
let container = document.getElementById('webgl-output')
let earth 
            
if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

init()

async function init() {

    let cacheF = cacheImages();
    let imgs = await cacheF();
    let _initStage = fp.flow(setScene,setCamera,addAxis,iniPlane,setLights,setRender,orbitControls,animate,windowResize);
    _initStage() //lodash代替下面的代码
    // setScene()
    // setCamera()
    // addAxis()
    // iniPlane()
    // setLights()
    
    // setRender()
    // orbitControls()
    // animate()
    // windowResize()
    setGUI()
    earth = drawEarth(30)
    drawCube(imgs[1],50,60,0,0)
    drawSphere(imgs[2],30, -65, 0, 0)
}

function setScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 0, 1500);    
}
function setGUI(){
    var ballPosition = {
        x:0,
        y:0
    }
    const gui = new dat.GUI();
    gui.add(ballPosition,"x",-65,60,0.1).onChange(function(value){
        earth.position.x = value
    })
    gui.add(ballPosition,"y",-30,30,0.1).onChange(function(value){
        earth.position.y = value
    })
}
function setCamera() {
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 2000);
    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 300;
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    //camera.lookAt(scene.position);
}
function iniPlane() {
    let planeGeo = new THREE.PlaneGeometry(40, 40);
    let planeMat = new THREE.MeshPhongMaterial({ color: 0x999999 });
    let plane = new THREE.Mesh(planeGeo, planeMat);
    plane.receiveShadow = true;
    plane.position.y = -0.01;
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    let grid = new THREE.GridHelper(40, 20, 0x000000, 0x000000);
    grid.material.transparent = true;
    grid.material.opacity = 0.3;
    scene.add(grid);
}

function setRender() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x220022, 1);
    container.appendChild(renderer.domElement);
}
function addAxis() {
    scene.add(new THREE.AxesHelper(20))
}

function setLights() {
    let light = new THREE.AmbientLight(0x666666);
    scene.add(light);
    light = new THREE.SpotLight(0x999999, 4, 200, 2);
    light.position.set(0, 150, 50);
    scene.add(light);
    light = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    light.position.set(0, 200, 0);
    scene.add(light);
}

function animate() {
    requestAnimationFrame(animate);
    render();

}
function orbitControls() {
    controls = new OrbitControls(camera,renderer.domElement);
    controls.autoRotateSpeed = 0.2;    
    controls.enableDamping = true;//阻尼 阻尼系数
    controls.dampingFactor = 0.4;
    controls.enableZoom = true;
    controls.minDistance = 5;
    controls.maxDistance = 1000;    
    controls.enablePan = false;//右键拖拽
}
function render() {
    let delta = clock.getDelta();
    renderer.render(scene, camera);
    state.update();
    controls.update(delta);
}

function windowResize() {
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

function drawSphere(img,r, x, y, z) {
    let geometry = new THREE.SphereGeometry(r, 32, 32);
    let maps1 = new THREE.TextureLoader().load(img.src);
    let material = new THREE.MeshStandardMaterial({
        map:maps1
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    //return mesh;
}
function drawCube(img,r,x,y,z) {
    let cubeGeo = new THREE.BoxGeometry(r,r,r);
    let maps1 = new THREE.TextureLoader().load(img.src);
    let cubeMat = new THREE.MeshPhongMaterial({
        map:maps1
    });
    let cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.set(x,y,z);
    cube.castShadow = true;
    scene.add(cube);
    //return cube;
}
function drawEarth(r) {
    //let maps1 = new THREE.TextureLoader().load(./assets/mapd.jpg); //传统的js方式加载不了 
    let imgurl = require('./assets/mapd.jpg')
    let maps1 = new THREE.TextureLoader().load(imgurl);
    let geometry = new THREE.SphereGeometry(r, 32, 32);
    let material = new THREE.MeshPhongMaterial({
        map: maps1,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        fog: true,
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    return mesh;
}