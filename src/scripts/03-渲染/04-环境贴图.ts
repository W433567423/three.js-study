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
camera.position.set(0, 0, 6)
scene.add(camera)

// 显示进度提示
const div = document.createElement('div')
div.style.width = '200px'
div.style.height = '100px'
div.style.position = 'fixed'
div.style.right = '0'
div.style.top = '0'
div.style.color = 'skyblue'
document.body.appendChild(div)


// 设置加载管理
const logF = {
    onLoad: () => console.log('加载完成------'),
    onProgress: (url: string, loaded: number, total: number) => {
        // console.log(messageControl)
        // messageControl.message({content: 'ss'})
        // console.log('加载进度------', `${(loaded / total * 100).toFixed(2)}%`)
        div.innerText = `加载进度------${(loaded / total * 100).toFixed(2)}%`
    },
    onError: (url: string) => console.log('加载管理器出现错误------', url)
}
const loadingManage = new THREE.LoadingManager(
    logF.onLoad,
    logF.onProgress,
    logF.onError,
)

// 纹理的常用属性
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManage)
const envMapTexture = cubeTextureLoader.load([
    "./textures/environmentMaps/1/px.jpg",
    "./textures/environmentMaps/1/nx.jpg",
    "./textures/environmentMaps/1/py.jpg",
    "./textures/environmentMaps/1/ny.jpg",
    "./textures/environmentMaps/1/pz.jpg",
    "./textures/environmentMaps/1/nz.jpg"])

// 添加物体
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial({
    envMap: envMapTexture,
    metalness: 1, // 金属度
    roughness: 0 // 粗糙度
});
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// 灯光(环境光)
const light = new THREE.AmbientLight('white', 0.5)
scene.add(light)
//  平行光
const directionLight = new THREE.DirectionalLight('white', 1)
directionLight.position.set(10, 10, 10)
scene.add(directionLight)

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
