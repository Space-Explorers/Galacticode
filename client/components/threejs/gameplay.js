// const OrbitControls = require('three-orbitcontrols')
const NodePhysijs = require('nodejs-physijs')
const THREE = NodePhysijs.THREE
// const THREE = require('three')
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
  // controls = new OrbitControls(camera)
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

  // GROUND
  // const planeGeometry = new THREE.CubeGeometry(150, 1, 150);

  // const groundMaterial = Physijs.createMaterial(
  //   new THREE.MeshBasicMaterial({ color: 0xFB8B0B })
  // )
  // ground = new Physijs.BoxMesh(planeGeometry, groundMaterial, 0);

  // // var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })

  // ground.receiveShadow = true;
  // ground.castShadow = false;
  // ground.rotation.x = -Math.PI / 2;
  // scene.add(ground);

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

  // // let alienRollingSpeed=(0.008 * 26 / 0.2)/5
  // let alienRollingSpeed = 0
  // let bounceValue = 0.01
  // let gravity = 0.005
  // let leftLane = -1
  // let rightLane = 1
  // let middleLane = 0
  // let currentLane



  // // const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  // // camera.position.z = 6.5;
  // // camera.position.y = 2.5;




  // //Alien
  // const alienGeometry = new THREE.DodecahedronGeometry(0.2, 1)
  // const alienMaterial = new THREE.MeshStandardMaterial({ color: 0x883333, shading: THREE.FlatShading })
  // //const jumping = false
  // const alien = new THREE.Mesh(alienGeometry, alienMaterial);
  // alien.castShadow = true;
  // alien.receiveShadow = false
  // alien.position.y = 1.8
  // alien.position.z = 4.8
  // currentLane = middleLane
  // alien.position.x = currentLane
  // scene.add(alien)

  // const keyMap = [];
  // document.addEventListener('keydown', onDocumentKeyDown, true);
  // document.addEventListener('keyup', onDocumentKeyUp, true);
  // function onDocumentKeyDown(event) {
  //   const keyCode = event.keyCode;
  //   keyMap[keyCode] = true;
  // }
  // function onDocumentKeyUp(event) {
  //   const keyCode = event.keyCode;
  //   keyMap[keyCode] = false;
  // }
  // function executeMovement() {
  //   let validMove = true;
  //   if (keyMap[37] === true) { //left
  //     console.log('left')
  //     if (currentLane == middleLane) {
  //       currentLane = leftLane;
  //     } else if (currentLane == rightLane) {
  //       currentLane = middleLane;
  //     } else {
  //       validMove = false;
  //     }
  //   } else if (keyMap[39] === true) { //right
  //     console.log('Right')
  //     if (currentLane == middleLane) {
  //       currentLane = rightLane;
  //     } else if (currentLane == leftLane) {
  //       currentLane = middleLane;
  //     } else {
  //       validMove = false;
  //     }
  //   } else {
  //     if (keyMap[38] === true) { //up, jump
  //       console.log('up')
  //       alienRollingSpeed = (0.008 * 26 / 0.2) / 5
  //     } else {
  //       alienRollingSpeed = 0
  //     }
  //     validMove = false;
  //   }
  //   if (validMove) {
  //     bounceValue = 0.06;
  //   }
  // }


  // // //createPlanet
  // const planetGeometry = new THREE.TetrahedronBufferGeometry(500, 4)
  // const planetMaterial = new THREE.MeshStandardMaterial({
  //   color: 0xfffafa,
  //   shading: THREE.FlatShading
  // })

  // const planet = new THREE.Mesh(planetGeometry, planetMaterial)
  // planet.receiveShadow = true
  // // planet.rotation.z =- Math.PI/2
  // scene.add(planet)
  // planet.position.y = 1.8
  // planet.position.x = 2
  // planet.position.z = 0


  // //lighting
  // const ambientLight = new THREE.AmbientLight(0x999999)
  // scene.add(ambientLight)

  // const light = new THREE.DirectionalLight(0xffffff, 1.5)
  // light.position.set(0, 4, 1);
  // light.castShadow = true;

  // scene.add(light)

  // // Render Loop
  // function render() {
  //   executeMovement()
  //   renderer.render(scene, camera)
  // }

  // function animate() {
  //   requestAnimationFrame(animate)
  //   alien.rotation.x -= alienRollingSpeed
  //   if (alien.position.y <= 1.8) {
  //     bounceValue = (Math.random() * 0.04) + 0.005
  //   }
  //   // alien.position.y += bounceValue
  //   alien.position.x = THREE.Math.lerp(alien.position.x, currentLane, 2 * clock.getDelta())
  //   bounceValue -= gravity
  //   planet.rotation.x += 0.008
  //   render()

  // }

  // animate()

  //END
}





