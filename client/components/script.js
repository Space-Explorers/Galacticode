// Create an empty scene
import * as THREE from 'three'

export default function init() {
  // Create an empty scene
  const scene = new THREE.Scene()

  // Create a basic perspective camera
  const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 4
  // camera.position.y = 1

  // Create a renderer with Antialiasing
  const renderer = new THREE.WebGLRenderer({antialias: true})

  // Configure renderer clear color
  renderer.setClearColor('#000000')

  // Configure renderer size
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement)

  // ------------------------------------------------
  // FUN STARTS HERE
  // ------------------------------------------------

  // Create a Cube Mesh with basic material
  const geometry = new THREE.SphereBufferGeometry(1, 10, 10)
  const material = new THREE.MeshPhongMaterial({color: 0xffffff})
  // const material = new THREE.MeshLambertMaterial({color: '#499785'})
  const sphere = new THREE.Mesh(geometry, material)

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6)
  hemiLight.color.setHSL(0.6, 1, 0.6)
  hemiLight.groundColor.setHSL(0.095, 1, 0.75)
  hemiLight.position.set(0, 50, 0)
  scene.add(hemiLight)
  const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10)
  scene.add(hemiLightHelper)

  // Add sphere to Scene
  scene.add(sphere)

  // Render Loop
  const render = function() {
    requestAnimationFrame(render)

    sphere.rotation.x += 0.001
    sphere.rotation.y += 0.001

    // Render the scene
    renderer.render(scene, camera)
  }

  render()
}
