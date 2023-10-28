import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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
const colorTexture1 = textureLoader1.load("./textures/壁纸1.jpg")
colorTexture1.offset.x = 0

const textureLoader2 = new THREE.TextureLoader()
const colorTexture2 = textureLoader2.load("./textures/壁纸3.jpg")
colorTexture2.offset.x = 0

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

