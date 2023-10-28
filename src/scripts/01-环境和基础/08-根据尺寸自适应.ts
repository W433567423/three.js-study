import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from "gsap";

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000) // 透视相机

// 设置相机
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

// 渲染
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
// console.log(renderer)
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 设置动画
gsap.to(cube.position, {
    x: 4, duration: 2, ease: "power1.inOut", repeat: -1, yoyo: true, onComplete: () => {
        console.log('移动完成')
    }
})
const animate = gsap.to(cube.rotation, {
    x: 2 * Math.PI, duration: 1, ease: "none", repeat: -1, onComplete: () => {
        console.log('旋转完成')
    }
})

window.addEventListener('dblclick', () => animate.isActive() ? animate.pause() : animate.resume()
)


// 渲染函数
const render = () => {
    // cube.position.x = (time || 0) / 1000 % 4
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

