// Create an empty scene
import * as THREE from 'three'

let particles

export default function planetBackground() {


  // Create an empty scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color( 0x252940 );

  // Create a basic perspective camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )

  camera.position.z = 200
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
    ctx.fillStyle = "#A9D9E5";
    for (i = j = 0; j <= 200; i = ++j) {
      ctx.beginPath();
      sizeRandom = Math.random() * 2;
      ctx.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, sizeRandom, 0, 2 * Math.PI, 0);
      ctx.fill();
    }
    return document.body.appendChild(canvas);
  };

  function drawParticles() {
     particles = new THREE.Group();
    scene.add(particles);
    const geometry = new THREE.TetrahedronGeometry(4, 0);

    for (let i = 0; i < 500; i ++) {
      const material = new THREE.MeshPhongMaterial({
        color: 0xA9D9E5,
        shading: THREE.FlatShading
      });
      const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set((Math.random() - 0.5) * 1000,
          (Math.random() - 0.5) * 1000,
          (Math.random() - 0.5) * 1000);
          mesh.updateMatrix();
          mesh.matrixAutoUpdate = false;
      particles.add(mesh);
    }
  }

  // Create Main Planet
  const mesh = new THREE.Mesh(
    //dictate the size of the planet (10 -17)
    new THREE.IcosahedronGeometry(5,1),
    new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    }),
  )
  mesh.rotation.set(0.4,0.3,0)
  mesh.receiveShadow = true
  mesh.position.set(0, 40, 0)
  scene.add(mesh)


  drawStars()
  drawParticles()



   //lighting
   const ambientLight = new THREE.AmbientLight(0x999999)
   scene.add(ambientLight)

  const light = new THREE.DirectionalLight(0xffffff, 1.5)
    light.position.set(200,100,200);
    light.castShadow = true;

  scene.add(light)


//shows in which direction the lighting is coming from
  const helper = new THREE.CameraHelper(light.shadow.camera)
  scene.add(helper)

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
    particles.rotation.x += 0.001;
    particles.rotation.y -= 0.004;
    mesh.rotation.y += 0.003
  }

  animate()
}


