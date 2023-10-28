import * as THREE from 'three'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) // 透视相机

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
renderer.render(scene, camera)

