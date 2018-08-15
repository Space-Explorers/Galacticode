// Create an empty scene
import * as THREE from 'three'

export default function planetBackground() {


  // Create an empty scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color( 0x0E2255 );

  // Create a basic perspective camera
  const camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.x = 70
  camera.position.y = 0
  camera.position.z = 1
  camera.lookAt(scene.position)

  // Create a renderer with Antialiasing
  const renderer = new THREE.WebGLRenderer({antialias: true})

  // Configure renderer set clear color
  renderer.setClearColor(0x000000, 0)

  // Configure renderer size
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement)

  // ------------------------------------------------
  // FUN STARTS HERE
  // ------------------------------------------------

  const drawStars = function() {
    let canvas, ctx, i, j, sizeRandom;
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    canvas.setAttribute('id', "stars");
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "#ffffff";
    for (i = j = 0; j <= 200; i = ++j) {
      ctx.beginPath();
      sizeRandom = Math.random() * 2;
      ctx.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, sizeRandom, 0, 2 * Math.PI, 0);
      ctx.fill();
    }
    return document.body.appendChild(canvas);
  };

  // Create Main Planet
  const mesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(10,1),
    new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    }),
  )
  mesh.receiveShadow = true
  mesh.position.set(20, -12, 0)
  scene.add(mesh)


  drawStars()



   //lighting
   const ambientLight = new THREE.AmbientLight(0x808080, 1.5)
   scene.add(ambientLight)

  const light = new THREE.DirectionalLight()
  light.position.set(75, 20, 20)
  scene.add(light)

//shows in which direction the lighting is coming from
  // const helper = new THREE.CameraHelper(light.shadow.camera)
  // scene.add(helper)

  // Add mesh to Scene
  scene.add(mesh)



  // Render Loop
  function render(){
    renderer.render(scene, camera)
  }

  function animate(){
    requestAnimationFrame(animate)
    render()
    // mesh.rotation.x += 0.01
    mesh.rotation.y += 0.003
  }

  animate()
}


