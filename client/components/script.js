// Create an empty scene
import * as THREE from 'three'

let particles

export default function planetBackground() {
  // Create an empty scene, camera
  const scene = new THREE.Scene()
  scene.background = new THREE.Color( 0x252940 );

  const camera = new THREE.PerspectiveCamera( 25,window.innerWidth / window.innerHeight, 1, 1000)
  camera.position.x = 0
  camera.position.y = 170
  camera.position.z = 900
  // camera.lookAt(scene.position)

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({antialias: true})

  renderer.setClearColor(0x000000, 0)
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement)

  //resize window
  window.addEventListener(
    'resize',
    function() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    },
    false
  );

  // Stars in the backgrounds
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

  //flying particles
  function drawParticles() {
     particles = new THREE.Group();
    scene.add(particles);
    const geometry = new THREE.TetrahedronGeometry(2, 0);

    for (let i = 0; i < 500; i ++) {
      const material = new THREE.MeshPhongMaterial({
        color: 0x9CE7EA,
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
    new THREE.IcosahedronGeometry(300,1),
    new THREE.MeshPhongMaterial({
      color: 0x205BF8,
      emissive: 0x0E24F3,
      side: THREE.DoubleSide,
      flatShading: true,
    }),
  )
  mesh.rotation.set(0.4,0.3,0)
  mesh.receiveShadow = true
  mesh.position.set(0, -190, 0)

  // Create Secondary Planet
    const otherPlanet = new THREE.Mesh(
      //dictate the size of the planet (10 -17)
      new THREE.IcosahedronGeometry(90,1),
      new THREE.MeshPhongMaterial({
        color: 0x2B1255,
        emissive: 0x995E78,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
    )
    otherPlanet.rotation.set(0.4,0.3,0)
    otherPlanet.receiveShadow = true
    otherPlanet.position.set(270, 190, 90)

  // Create Third Planet
    const thirdPlanet = new THREE.Mesh(
      //dictate the size of the planet (10 -17)
      new THREE.IcosahedronGeometry(40,1),
      new THREE.MeshPhongMaterial({
        color: 0xCD4537,
        emissive: 0xCD4537,
        side: THREE.DoubleSide,
        flatShading: true,
      }),
    )
    thirdPlanet.rotation.set(0.4,0.3,0)
    thirdPlanet.receiveShadow = true
    thirdPlanet.position.set(-250, 300, 90)


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
  // const helper = new THREE.CameraHelper(light.shadow.camera)
  // scene.add(helper)

  // Add mesh to Scene
    scene.add(mesh)
    scene.add(otherPlanet)
    scene.add(thirdPlanet)


  // Render Loop
  function render(){
    renderer.render(scene, camera)
  }

  function animate(){
    requestAnimationFrame(animate)
    render()
    particles.rotation.x += 0.001;
    particles.rotation.y -= 0.001;
    mesh.rotation.y += 0.003
    otherPlanet.rotation.y += 0.003
    thirdPlanet.rotation.y += 0.003

  }

  animate()
}


