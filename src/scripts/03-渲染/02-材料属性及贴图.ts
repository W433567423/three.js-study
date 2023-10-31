import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {cosUrl} from "../../assets/constant";

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000) // 透视相机

// 设置相机
camera.position.set(-1, -1, 1)
scene.add(camera)


// 纹理的常用属性
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load(`${cosUrl}/textures/door/color.jpg`)
const doorAplhaTexture = textureLoader.load(`${cosUrl}/textures/door/alpha.jpg`)
const doorAoTexture = textureLoader.load(`${cosUrl}/textures/door/ambientOcclusion.jpg`)
const doorHeightTexture = textureLoader.load(`${cosUrl}/textures/door/height.jpg`)
const doorRoughnessTexture = textureLoader.load(`${cosUrl}/textures/door/roughness.jpg`)
const doorMetalnessTexture = textureLoader.load(`${cosUrl}/textures/door/metalness.jpg`)
const doorNormalTexture = textureLoader.load(`${cosUrl}/textures/door/normal.jpg`)

const geometry = new THREE.BoxGeometry(2, 2, 2, 100, 200, 200);

const material = new THREE.MeshStandardMaterial({
    color: "#ffff00",
    map: doorColorTexture,
    alphaMap: doorAplhaTexture, //透明遮挡

    transparent: true,
    aoMap: doorAoTexture, //环境遮挡,
    aoMapIntensity: 1,

    displacementMap: doorHeightTexture, //置换贴图
    displacementScale: 0.25,
    // side: THREE.DoubleSide,

    roughness: 1,//    粗糙度
    roughnessMap: doorRoughnessTexture,

    metalness: 1,//金属度
    metalnessMap: doorMetalnessTexture,

    normalMap: doorNormalTexture // 法线
});
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// 灯光(环境光)
const light = new THREE.AmbientLight('white', 0.5)
scene.add(light)
//  平行光
const directionLight = new THREE.DirectionalLight('white', 1)
directionLight.position.set(10, 10, 10)
scene.add(directionLight)

// 添加平面
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2), material
)
// plane.position.setX(2)
scene.add(plane)

// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)


// 渲染函数
const render = () => {
    controls.update()
    renderer.render(scene, camera)
    // 请求下一帧渲染
    requestAnimationFrame(render)
}
render()

//监听页面变化,更新渲染
window.addEventListener('resize', () => {
//     更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight
//     更新摄像头矩阵
    camera.updateProjectionMatrix()
//     更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
//     更新渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})

