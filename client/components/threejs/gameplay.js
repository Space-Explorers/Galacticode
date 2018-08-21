const NodePhysijs = require('nodejs-physijs')
const THREE = NodePhysijs.THREE
// const OrbitControls = require('three-orbit-controls')(THREE)
const REALTHREE = require('three')
const Ammo = NodePhysijs.Ammo
const Physijs = NodePhysijs.Physijs(THREE, Ammo)
import { Clock } from './clock'

var sceneWidth, sceneHeight, render, renderer, scene, camera, box, sun, ground, controls, clock;

let alien, forceAmount = 100

const createScene = function () {

  sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;

  renderer = new THREE.WebGLRenderer({ alpha: true })
  // renderer.shadowMap.enabled = true;//enable shadow
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // renderer.setClearColor(0x000000, 0)
  renderer.setSize(sceneWidth, sceneHeight)
  document.body.appendChild(renderer.domElement)

  scene = new Physijs.Scene()
  scene.setGravity(new THREE.Vector3(0, -10, 0))
  // scene.background = new THREE.Color(0x252940);
  clock = new Clock();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 40
  camera.position.y = 15
  controls = new THREE.OrbitControls(camera, render.domElement)
  // camera.position.set(60, 50, 60);
  // camera.lookAt(scene.position);
  scene.add(camera);

  sun = new THREE.DirectionalLight(0xffffff, 0.8);
  sun.position.set(0, 4, 1);
  sun.castShadow = true;
  scene.add(sun);
  //Set up shadow properties for the sun light
  // sun.shadow.mapSize.width = 256;
  // sun.shadow.mapSize.height = 256;
  // sun.shadow.camera.near = 0.5;
  // sun.shadow.camera.far = 50;

  // Box
  box = new Physijs.BoxMesh(
    new THREE.CubeGeometry(5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x888888 }),
    5
  );
  scene.add(box);

  // GROUND V2
  var geo = new THREE.CubeGeometry(5000, 0.1, 5000);
  var mat = new Physijs.createMaterial(new THREE.MeshLambertMaterial({ color: '#86FBC6' }, 1, 0.3));
  ground = new Physijs.BoxMesh(geo, mat, 0);
  ground.receiveShadow = true
  ground.position.set(0, 0, 0)
  // ground.rotation.x = -Math.PI / 2;
  // ground.position.y = -170;
  scene.add(ground);

  // // -------------GROUND v3
  // ground = new THREE.Mesh(
  //   new THREE.PlaneGeometry(10000, 10000, 100, 100),
  //   new THREE.MeshNormalMaterial()
  // );
  // ground.rotation.x = -Math.PI / 2
  // ground.position.y = -170
  const newChallenge = addChallenge()
  // newChallenge.addEventlistener('collision', onCollision)
  // scene.add(newChallenge)
  addAlien(new THREE.Vector3(0, 5, 0))

  requestAnimationFrame(render);
}

render = function () {
  let deltaTime = clock.getDelta()
  controls.update(deltaTime)
  camera.lookAt(scene.position)
  scene.simulate(); // run physics
  executeMovement()
  renderer.render(scene, camera); // render the scene
  requestAnimationFrame(render);
};

// ALIEN
function addAlien(pos) {
  const alienMaterial = Physijs.createMaterial(
    new THREE.MeshPhongMaterial({ color: 0xD80E58 }), 0.8, 0.8 // low restitution
  );

  alien = new Physijs.SphereMesh(new THREE.SphereGeometry(5, 32, 32), alienMaterial, 5 // mass
  );
  alien.position.copy(pos)
  alien.receiveShadow = true
  alien.castShadow = true
  scene.add(alien);
}

//Challenges
function addChallenge() {
  let challenge = new Physijs.ConvexMesh(
    new THREE.TorusGeometry(100, 50, 8, 20),
    new THREE.MeshBasicMaterial({ color: 0xF9B8B5, shading: THREE.Flatshading }, 2, 0)
  )
  challenge.castShadow = true
  // challenge.addEventlistener('collision', onCollision)
  return challenge
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
function executeMovement() {
  document.addEventListener("keydown", function (event) {
    let key = event.keyCode
    let movement = new THREE.Vector3(0.0)
    switch (key) {
      case 87: {
        movement.z = -1 * forceAmount
      } break
      case 83: {
        movement.z = 1 * forceAmount
      } break
      case 65: {
        movement.x = -1 * forceAmount
      } break
      case 68: {
        movement.x = 1 * forceAmount
      } break
    }
    alien.applyForce(movement, new THREE.Vector3(0, 1, 0))

  })
  window.addEventListener('resize', onWindowResize, false)

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// function onWindowResize() {
//   //resize & align
//   sceneHeight = window.innerHeight;
//   sceneWidth = window.innerWidth;
//   renderer.setSize(sceneWidth, sceneHeight);
//   camera.aspect = sceneWidth / sceneHeight;
//   camera.updateProjectionMatrix();
// }


export default function gamePlayEnvironment() {

  createScene();

}





