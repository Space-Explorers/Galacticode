import * as THREE from 'three'
// import * as CANNON from 'cannon'



export default function gamePlayEnvironment() {
  let alienRollingSpeed=(0.008 * 26 / 0.2)/5
  let bounceValue = 0.01
  let gravity=0.005
  let leftLane=-1
  let rightLane=1
  let middleLane=0
  let currentLane

      const clock = new THREE.Clock()
      clock.start()
      const scene = new THREE.Scene()
      scene.background = new THREE.Color( 0x252940 );
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 6.5;
      camera.position.y = 2.5;

      const renderer = new THREE.WebGLRenderer({alpha: true})
      renderer.shadowMap.enabled = true;//enable shadow
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.setClearColor(0x000000, 0)
      renderer.setSize(window.innerWidth, window.innerHeight)
      document.body.appendChild(renderer.domElement)

      // //initialize Cannon World
      // const world = new CANNON.World()
      // world.gravity.set(0,0,0)
      // world.broadphase = new CANNON.NaiveBroadphase()

      //Alien
      const alienGeometry = new THREE.DodecahedronGeometry( 0.2,1)
      const alienMaterial = new THREE.MeshStandardMaterial( { color: 0x883333, shading: THREE.FlatShading } )
      //const jumping = false
      const alien = new THREE.Mesh( alienGeometry, alienMaterial );
      alien.castShadow=true;
      alien.receiveShadow=false
      alien.position.y=1.8
      alien.position.z=4.8
      currentLane = middleLane
      alien.position.x = currentLane
      scene.add( alien )
      // //createPlanet
        const planetGeometry = new THREE.TetrahedronBufferGeometry(500,4)
        const planetMaterial = new THREE.MeshStandardMaterial({
          color: 0x205BF8,
          shading: THREE.FlatShading
        })
        const planet = new THREE.Mesh(planetGeometry, planetMaterial)
        planet.receiveShadow = true
        planet.rotation.z =- Math.PI/2
        scene.add(planet)
        planet.position.y =-24
        planet.position.x=2



        // const orbitControl = new THREE.OrbitControls( camera, renderer.domElement );
        // orbitControl.addEventListener( 'change', render );
        // orbitControl.enableZoom = false;



       //lighting
   const ambientLight = new THREE.AmbientLight(0x999999)
   scene.add(ambientLight)

    const light = new THREE.DirectionalLight(0xffffff, 1.5)
    light.position.set(0,4,1);
    light.castShadow = true;

    scene.add(light)

      // Render Loop
  function render(){
    renderer.render(scene, camera)
  }

  function animate(){
    requestAnimationFrame(animate)
    alien.rotation.x -= alienRollingSpeed
    if(alien.position.y <= 1.8){
      bounceValue=(Math.random()*0.04)+0.005
    }
    alien.position.y += bounceValue
    // alien.position.x = THREE.Math.lerp(alien.position.x, currentLane, 2*clock.getDelta())
    bounceValue -= gravity
    planet.rotation. x += 0.008
    render()
  }

  animate()

//END
  }





