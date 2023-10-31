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
camera.position.set(2, 2, 10)
scene.add(camera)


// 纹理
const textureLoader1 = new THREE.TextureLoader()
const colorTexture1 = textureLoader1.load(`${cosUrl}/textures/壁纸1.jpg`)
// 偏移
// colorTexture1.offset.x = 0
// 重复
colorTexture1.repeat.set(2, 3)
colorTexture1.wrapT = THREE.RepeatWrapping
colorTexture1.wrapS = THREE.RepeatWrapping

const textureLoader2 = new THREE.TextureLoader()
const colorTexture2 = textureLoader2.load(`${cosUrl}/textures/壁纸3.jpg`)
// 设置中心点
colorTexture2.center.set(0.5, 0.5)
// 旋转
colorTexture2.rotation = Math.PI / 4


const textureLoader3 = new THREE.TextureLoader()
const colorTexture3 = textureLoader3.load(`${cosUrl}/textures/bg-1.jpg`)

// 添加物体
// 正方体 + 基础材质
const geometry1 = new THREE.BoxGeometry(2, 2, 2);
const material1 = new THREE.MeshBasicMaterial({
    // color: "#00ff00",
    map: colorTexture1
});
const cube = new THREE.Mesh(geometry1, material1);
scene.add(cube);

// 圆
const geometry2 = new THREE.CircleGeometry(1, 64);
const material2 = new THREE.MeshBasicMaterial({
    // color: "skyblue",
    map: colorTexture2
});
const capsule = new THREE.Mesh(geometry2, material2);
capsule.position.setX(3)
scene.add(capsule);

//
const geometry3 = new THREE.TorusKnotGeometry(2, 0.3, 64, 8, 2, 3);
const material3 = new THREE.MeshBasicMaterial({map: colorTexture3});
const torusKnot = new THREE.Mesh(geometry3, material3);
torusKnot.position.setX(8)
scene.add(torusKnot);


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
    console.log('画面尺寸变化')
//     更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight
//     更新摄像头矩阵
    camera.updateProjectionMatrix()
//     更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
//     更新渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})

