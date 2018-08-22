const NodePhysijs = require('nodejs-physijs')
// const THREE = NodePhysijs.THREE
import * as THREE from 'three'
import OrbitControls from './orbitControls'
// const Ammo = NodePhysijs.Ammo
// const Physijs = NodePhysijs.Physijs(THREE, Ammo)
// import { Clock } from './clock'
import { THREEx } from './keyboardState'
var keyboard = new THREEx.KeyboardState();

var sceneWidth, sceneHeight, renderer, scene, camera, sun, ground, controls, alien, box, challenge;

let forceAmount = 100,
  fov = 45,
  zoomX = 0,
  zoomY = 20,
  zoomZ = 40;
const clock = new THREE.Clock();

// const gridColor = 0x86FBC6

// const createScene = function () {

//   sceneWidth = window.innerWidth;
//   sceneHeight = window.innerHeight;

//   renderer = new THREE.WebGLRenderer({ alpha: true })
//   // renderer.shadowMap.enabled = true;//enable shadow
//   // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//   // renderer.setClearColor(0x000000, 0)
//   renderer.setSize(sceneWidth, sceneHeight)
//   document.body.appendChild(renderer.domElement)

//   scene = new Physijs.Scene()
//   scene.setGravity(new THREE.Vector3(0, -10, 0))
//   // scene.background = new THREE.Color(0x252940);
//   clock = new Clock();

//   const frustumSize = 1000
//   const aspect = sceneWidth / sceneHeight
//   camera = new THREE.PerspectiveCamera(
//     45,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   camera.position.z = 100
//   camera.position.y = 35
//   controls = new REALTHREE.OrbitControls(camera)
//   // camera.position.set(60, 50, 60);
//   // camera.lookAt(scene.position);
//   scene.add(camera);

//   sun = new THREE.DirectionalLight(0xffffff, 0.8);
//   sun.position.set(0, 4, 1);
//   sun.castShadow = true;
//   scene.add(sun);
//   //Set up shadow properties for the sun light
//   // sun.shadow.mapSize.width = 256;
//   // sun.shadow.mapSize.height = 256;
//   // sun.shadow.camera.near = 0.5;
//   // sun.shadow.camera.far = 50;

//   // Box
//   box = new Physijs.BoxMesh(
//     new THREE.CubeGeometry(5, 5, 5),
//     new THREE.MeshBasicMaterial({ color: 0x888888 }),
//     5
//   );
//   // scene.add(box);

//   // GROUND V2
//   var geo = new THREE.CubeGeometry(5000, 0.1, 5000);
//   var mat = new Physijs.createMaterial(new THREE.MeshLambertMaterial({ color: '#86FBC6' }, 1, 0.3));
//   ground = new Physijs.BoxMesh(geo, mat, 0);
//   ground.receiveShadow = true
//   ground.position.set(0, 0, 0)
//   // ground.rotation.x = -Math.PI / 2;
//   // ground.position.y = -170;
//   scene.add(ground);

//   // // -------------GROUND v3
//   // ground = new THREE.Mesh(
//   //   new THREE.PlaneGeometry(10000, 10000, 100, 100),
//   //   new THREE.MeshNormalMaterial()
//   // );
//   // ground.rotation.x = -Math.PI / 2
//   // ground.position.y = -170
//   const newChallenge = addChallenge()
//   // newChallenge.addEventlistener('collision', onCollision)
//   // scene.add(newChallenge)
//   addAlien(new THREE.Vector3(0, 5, 0))

//   // requestAnimationFrame(render);
// }

/***************************************************************
* Custom User Functions
***************************************************************/

function createFloor() {
  var planeGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
  var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
  ground = new THREE.Mesh(planeGeometry, planeMaterial);
  // ground.receiveShadow = true;
  // ground.castShadow = false;
  ground.rotation.x = -Math.PI / 2;
  return ground
}

// ALIEN
// function addAlien() {
//   const alienMaterial = Physijs.createMaterial(
//     new THREE.MeshPhongMaterial({ color: 0xD80E58 }), 0.8, 0.8 // low restitution
//   );

//   alien = new Physijs.SphereMesh(new THREE.SphereGeometry(5, 32, 32), alienMaterial, 5 // mass
//   );
//   alien.position.set(0, 4 / 2, 0);
//   alien.receiveShadow = true
//   alien.castShadow = true
//   scene.add(alien);
// }




//Challenges
function addChallenge(pos1, pos2, pos3) {
  let newChallenge = new THREE.Mesh(
    new THREE.TorusGeometry(),
    new THREE.MeshBasicMaterial({ color: 0xF9B8B5, shading: THREE.Flatshading }, 2, 0)
  )
  newChallenge.castShadow = true
  // challenge.addEventlistener('collision', onCollision)
  newChallenge.position.set(pos1, pos2, pos3)
  return newChallenge
}

// const keyMap = [];
//   document.addEventListener('keydown', onDocumentKeyDown, true);
//   document.addEventListener('keyup', onDocumentKeyUp, true);
// function onDocumentKeyDown(event) {
//     const keyCode = event.keyCode;
//     keyMap[keyCode] = true;
//   }
// function onDocumentKeyUp(event) {
//     const keyCode = event.keyCode;
//     keyMap[keyCode] = false;
//   }



// const update = function () {

//   // THREE.AnimationHandler.update(delta)
//   // if (controls) controls.update(delta)
//   camera.lookAt(scene.position)
//   scene.simulate(); // run physics
//   requestAnimationFrame(update);
//   render()
// };

function createAlien(alienSize, alienColor) {
  alienSize = alienSize || 4;
  alienColor = alienColor || 0xDADADA;
  var alienGeometry = new THREE.BoxGeometry(alienSize, alienSize, alienSize);
  var alienMaterial = new THREE.MeshLambertMaterial({ color: 0xF9B8B5 });
  var alienFigure = new THREE.Mesh(alienGeometry, alienMaterial);
  alienFigure.position.set(0, alienSize / 2, 0);
  return alienFigure;
}

function updateAlien() {
  let delta = clock.getDelta()
  const moveDistance = 30 * delta
  var rotationAngle = 0.5 * Math.PI / 1.2 * delta;

  // Basic rotation
  if (keyboard.pressed('w') || keyboard.pressed('up')) {
    alien.translateZ(-moveDistance);
  }
  if (keyboard.pressed('s') || keyboard.pressed('down')) {
    alien.translateZ(moveDistance);
  }
  if (keyboard.pressed('a') || keyboard.pressed('left')) {
    alien.rotation.y += rotationAngle;
  }
  if (keyboard.pressed('d') || keyboard.pressed('right')) {
    alien.rotation.y -= rotationAngle;
  }

  // Adjust chase camera
  var relativeCameraOffset = new THREE.Vector3(zoomX, zoomY, zoomZ);
  var cameraOffset = relativeCameraOffset.applyMatrix4(alien.matrixWorld);
  camera.position.x = cameraOffset.x;
  camera.position.y = cameraOffset.y;
  camera.position.z = cameraOffset.z;
  camera.lookAt(alien.position);

  // document.addEventListener("keydown", function (event) {
  //   let key = event.keyCode
  //   let movement = new THREE.Vector3(0, 0, 0)
  //   switch (key) {
  //     case 87: {
  //       movement.z = -1 * forceAmount
  //       console.log('UPPPPPP')
  //     } break
  //     case 83: {
  //       movement.z = 1 * forceAmount
  //       console.log('DOWN')
  //     } break
  //     case 65: {
  //       movement.x = -1 * forceAmount
  //       console.log('left')
  //     } break
  //     case 68: {
  //       movement.x = 1 * forceAmount
  //       console.log('right')
  //     } break
  //   }
  // alien.applyForce(movement, new THREE.Vector3(0, 1, 0))

  // })
  // window.addEventListener('resize', onWindowResize, false)

}

/***************************************************************
* Helper Functions Declarations
***************************************************************/
function renderScene() {
  renderer.render(scene, camera);
}

function animateScene() {
  window.requestAnimationFrame(animateScene);
  renderScene();
  updateAlien();
}

function resizeWindow() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderScene();
}


/***************************************************************
* Scene Initialization
***************************************************************/
function initializeScene() {

  // Scene and resize listener
  scene = new THREE.Scene();
  var canvasWidth = window.innerWidth;
  var canvasHeight = window.innerHeight;
  window.addEventListener('resize', resizeWindow, false);

  // Camera and initial view
  var aspectRatio = canvasWidth / canvasHeight;
  camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.01, 3000);
  camera.position.set(zoomX, zoomY, zoomZ);
  camera.lookAt(scene.position);
  scene.add(camera);

  // WebGL renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(canvasWidth, canvasHeight);
  document.body.appendChild(renderer.domElement)
  // $(containerID).append(renderer.domElement);

  // Ambient light
  var lightAmbient = new THREE.AmbientLight(0x5a5a5a);
  var lightSource = new THREE.PointLight(0x7a7a7a);
  lightSource.position.set(0, 50, -100);
  scene.add(lightAmbient);
  scene.add(lightSource);

  // Starter floor grid
  var floor = createFloor();
  scene.add(floor);

  // Add Movable Cube
  alien = createAlien();
  scene.add(alien);

  // Add Challenge
  const challenge1 = addChallenge(20, 10, 1)
  scene.add(challenge1)

  const challenge2 = addChallenge(-30, 10, 20)
  scene.add(challenge2)

  const challenge3 = addChallenge(-100, 10, -20)
  scene.add(challenge3)


}

export default function gamePlayEnvironment() {
  /***************************************************************
  * Render and Animate
  ***************************************************************/
  initializeScene();
  animateScene();
  // createScene();

}
