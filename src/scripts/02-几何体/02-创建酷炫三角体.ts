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
camera.position.set(0, 0, 12.5)
scene.add(camera)

// 添加物体
for (let i = 0; i < 50; i++) {
    const geometry = new THREE.BufferGeometry()
    const positionArr = new Float32Array(9)
    for (let j = 0; j < 9; j++) {
        positionArr[j] = Math.random() * 4
    }
    const color = new THREE.Color(Math.random(), Math.random(), Math.random())
    geometry.setAttribute('position', new THREE.BufferAttribute(positionArr, 3))
    const material = new THREE.MeshBasicMaterial({
        color,
        opacity: .8,
        transparent: true
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
}


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

