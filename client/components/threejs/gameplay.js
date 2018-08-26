import * as THREE from 'three'
import { THREEx } from './keyboardState'
var keyboard = new THREEx.KeyboardState();

var sceneWidth, sceneHeight, renderer, scene, camera, sun, ground, controls, alien, box, challenge, gravity;
let completedColor = 0x8C04FF;
let notCompleted = 0x07FEFF;
let forceAmount = 100,
  fov = 45,
  zoomX = 0,
  zoomY = 20,
  zoomZ = 40;
const clock = new THREE.Clock();
const challenges = [];
var loader = new THREE.TextureLoader();
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min

/***************************************************************
* Custom User Functions
***************************************************************/

//Challenges
function addChallenge(challengeId, pos1, pos2, pos3, color) {

  var geometry = new THREE.ConeGeometry(5, 10, 10);
  var material = new THREE.MeshStandardMaterial({ color: notCompleted, flatShading: THREE.FlatShading });
  var newChallenge = new THREE.Mesh(geometry, material);
  newChallenge.castShadow = true
  newChallenge.receiveShadow = true
  newChallenge.position.set(pos1, pos2, pos3)
  newChallenge.challengeId = challengeId
  return newChallenge
}

//  ALIEN
function createAlien(alienSize, alienColor) {
  var alienGeometry = new THREE.OctahedronGeometry(1.7, 1);
  var alienMaterial = new THREE.MeshStandardMaterial({ color: 0xED1D69, flatShading: THREE.FlatShading })
  const alienFigure = new THREE.Mesh(alienGeometry, alienMaterial);
  alienFigure.name = 'alien'
  alienFigure.position.set(0, alienSize / 2, 0);
  alienFigure.receiveShadow = true;
  alienFigure.castShadow = true;
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
  camera.position.y = cameraOffset.y - 5;
  camera.position.z = cameraOffset.z;
  camera.lookAt(alien.position);

}



function checkCollision() {

  challenges.forEach(function (cone) {
    cone.material.transparent = false;
    cone.material.opacity = 1.0;

  });

  var nova = scene.getObjectByName('alien');
  var originPoint = nova.position.clone()

  for (var vertexIndex = 0; vertexIndex < nova.geometry.vertices.length; vertexIndex++) {
    var localVertex = nova.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4(nova.matrix);
    var directionVector = globalVertex.sub(nova.position);

    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var collisionResults = ray.intersectObjects(challenges);

    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
      collisionResults[0].object.material.transparent = true;
      collisionResults[0].object.material.opacity = 0.4;
      console.log('collisionResults', collisionResults)
      window.location.replace(`http://localhost:8080/challenge/${collisionResults[0].object.challengeId}`)
    }
  }
}


/***************************************************************
* Helper Functions Declarations
***************************************************************/

function renderScene() {
  renderer.render(scene, camera);
  checkCollision();
}

function animateScene() {
  window.requestAnimationFrame(animateScene);
  renderScene();
  updateAlien();
  checkCollision();
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
  scene.background = new THREE.Color(0x252940);

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
  var lightAmbient = new THREE.AmbientLight(0x999999);
  var lightSource = new THREE.PointLight(0x7a7a7a);
  lightSource.position.set(0, 50, -100);
  scene.add(lightAmbient);
  scene.add(lightSource);

  const light = new THREE.DirectionalLight(0xffffff, 1.5)
  light.position.set(0, 50, 200);
  light.castShadow = true;

  scene.add(light)

  // Add Floor
  loader.load('/floor_texture.png', function (tex) {
    let planeGeometry = new THREE.CircleGeometry(200, 32);
    let planeMaterial = new THREE.MeshPhongMaterial({
      color: 0x205BF8,
      emissive: 0x0E24F3,
      side: THREE.DoubleSide,
      flatShading: true,
      map: tex,
      transparent: false
    });

    ground = new THREE.Mesh(planeGeometry, planeMaterial);
    // ground.receiveShadow = true;
    // ground.castShadow = false;
    ground.rotation.x = -Math.PI / 2.0005;
    // ground.opacity(0)
    scene.add(ground);
  });

  // Add Movable Cube
  alien = createAlien();
  alien.position.y = 1;
  alien.position.z = 4.8;
  scene.add(alien);

  // Add Challenges
  const challenge1 = addChallenge(1, 20, 2, 1)
  scene.add(challenge1)
  challenges.push(challenge1)

  const challenge2 = addChallenge(2, -30, 2, 20)
  scene.add(challenge2)
  challenges.push(challenge2)

  const challenge3 = addChallenge(3, -100, 2, -20)
  scene.add(challenge3)
  challenges.push(challenge3)

  const challenge4 = addChallenge(10, 0, 2, -20)
  scene.add(challenge4)
  challenges.push(challenge4)

  const challenge5 = addChallenge(5, 100, 2, -71)
  scene.add(challenge5)
  challenges.push(challenge5)

  const stars = new THREE.Group()
  const geometry = new THREE.SphereGeometry(10, 3, 3)
  const material = new THREE.MeshBasicMaterial({
    color: 0xA9D9E5,
    wireframe: false,
  })

  const radius = 2500
  const separation = 3

  for (let i = 0 + separation; i <= 180 - separation; i += separation) {
    const radian1 = i * Math.PI / 180

    for (let j = 0; j < 360; j += separation) {
      const radian2 = j * Math.PI / 180

      const cube = new THREE.Mesh(geometry, material)

      cube.position.x = randomNumberInRange(.7, 2.2) * radius * Math.sin(radian1) * Math.cos(radian2)
      cube.position.y = randomNumberInRange(.7, 2.2) * radius * Math.sin(radian1) * Math.sin(radian2)
      cube.position.z = randomNumberInRange(.7, 2.2) * radius * Math.cos(radian1)

      cube.rotation.x = Math.random()
      cube.rotation.y = Math.random()
      cube.rotation.z = Math.random()

      stars.add(cube)
    }

  }
  scene.add(stars)

}


export default function gamePlayEnvironment() {
  initializeScene();
  animateScene();
}
