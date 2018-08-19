import * as THREE from 'three'

let rollingSpeed = 0.008
let worldRadius = 26
let heroRadius = 0.2
let heroBaseY = 1.8
let bounceValue = 0.1
let gravity = 0.005
let leftLane = -1
let rightLane = 1
let middleLane = 0

let challengeReleaseInterval = 0.5
let lastChallengeReleaseTime = 0

let particleCount = 20
let explosionPower = 1.06


export default function gamePlayEnvironment() {
  init()
  function init(){
    createScene()
    update()
  }

  function createScene(){
    const hasCollided = false
    const score = 0
    const challengesOnPlanet = []
    const challengePool = []
    const clock = new THREE.Clock()
    clock.start()

    const heroRollingSpeed = (rollingSpeed*worldRadius/heroRadius)/5

    const sphericalHelper = new THREE.Spherical()
    const pathAngleValues = [1.52, 1.57, 1.62]

    //create and empty scene and camera
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x252940)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 6.5;
    camera.position.y = 2.5;

    //create a renderer
    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(window.innerWidth, window.innerheight)

    //append renderer to DOM
    document.body.appendChild(renderer.domElement)

    //Add items to scene
    createChallengesPool();
    addWorld();
    addHero();
    addLight();
    addExplosion();

    document.onkeydown = handleKeyDown;

    function addExplosion(){
      const particles = new THREE.Geometry()
      for(let i = 0; i < particleCount; i++){
        const vertex = new THREE.Vector3()
        particles.vertices.push( vertex)
      }
      var pMaterial = new THREE.ParticleBasicMaterial({
        color: 0xfffafa,
        size: 0.2
      })

      const parti = new THREE.Points(particles, pMaterial)
      scene.add(parti)
      parti.visible = false
    }

    function createChallengesPool(){
      const maxChallengesInPool = 5
      const newChallenge
      const createChallenge
      for(let i = 0; i < maxChallengesInPool; i++){
        newChallenge = createChallenge()
        challengePool.push(newChallenge)
      }
    }


//END
  }





}
