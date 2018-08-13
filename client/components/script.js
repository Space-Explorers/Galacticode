// Create an empty scene
import * as THREE from 'three'

export default function init() {
  // Create an empty scene
  var scene = new THREE.Scene()

  // Create a basic perspective camera
  var camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 4

  // Create a renderer with Antialiasing
  var renderer = new THREE.WebGLRenderer({antialias: true})

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
  var geometry = new THREE.SphereBufferGeometry(1, 10, 10)
  // var material = new THREE.MeshPhongMaterial({ color: 0xffffff });
  var material = new THREE.MeshNormalMaterial({color: '#499785'})
  var sphere = new THREE.Mesh(geometry, material)

  // Add cube to Scene
  scene.add(sphere)

  // Render Loop
  var render = function() {
    requestAnimationFrame(render)

    sphere.rotation.x += 0.01
    sphere.rotation.y += 0.01

    // Render the scene
    renderer.render(scene, camera)
  }

  render()
}
