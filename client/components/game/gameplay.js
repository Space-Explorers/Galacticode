import * as THREE from 'three'

window.game = window.game || {}

window.game.three = function () {
      let alienRollingSpeed = 0
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



      //keyboard Controls
      const keyMap = [];
      document.addEventListener('keydown', onDocumentKeyDown, true);
      document.addEventListener('keyup', onDocumentKeyUp, true);
      function onDocumentKeyDown(event) {
        const keyCode = event.keyCode;
        keyMap[keyCode] = true;
      }
      function onDocumentKeyUp(event) {
        const keyCode = event.keyCode;
        keyMap[keyCode] = false;
      }
      function executeMovement() {
        let validMove = true;
        if (keyMap[37] === true) { //left
          console.log('left')
          if (currentLane == middleLane) {
            currentLane = leftLane;
          } else if (currentLane == rightLane) {
            currentLane = middleLane;
          } else {
            validMove = false;
          }
        } else if (keyMap[39] === true) { //right
          console.log('Right')
          if (currentLane == middleLane) {
            currentLane = rightLane;
          } else if (currentLane == leftLane) {
            currentLane = middleLane;
          } else {
            validMove = false;
          }
        } else if (keyMap[38] === true) { //up, jump
            console.log('up')
            alienRollingSpeed=(0.008 * 26 / 0.2)/5
        }else{
          if(keyMap[40] === true){//down
            alienRollingSpeed = .001
          }
        }
        validMove = false;
        if (validMove) {
          bounceValue = 0.06;
        }
      }


      // //createPlanet
        const planetGeometry = new THREE.PlaneGeometry(5,5, 4,4)
        const planetMaterial = new THREE.MeshStandardMaterial({
          color: 0x5BBCF6,
          shading: THREE.FlatShading
        })

        const planet = new THREE.Mesh(planetGeometry, planetMaterial)
        planet.receiveShadow = true
        planet.castShadow =false
        planet.position.y = 0
        // planet.rotation.x= -0.5 * Math.PI
        planet.position.z = 4.8
        scene.add(planet)




       //lighting
   const ambientLight = new THREE.AmbientLight(0x999999)
   scene.add(ambientLight)

    const light = new THREE.DirectionalLight(0xffffff, 1.5)
    light.position.set(0,4,1);
    light.castShadow = true;

    scene.add(light)

    //     // Stars in the backgrounds
    // const drawStars = function() {
    //   let canvas, ctx, i, j, sizeRandom;
    //   canvas = document.createElement('canvas');
    //   canvas.setAttribute('width', window.innerWidth);
    //   canvas.setAttribute('height', window.innerHeight);
    //   canvas.setAttribute('id', "stars");
    //   ctx = canvas.getContext('2d');
    //   ctx.fillStyle = "#A9D9E5";
    //   for (i = j = 0; j <= 200; i = ++j) {
    //     ctx.beginPath();
    //     sizeRandom = Math.random() * 2;
    //     ctx.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, sizeRandom, 0, 2 * Math.PI, 0);
    //     ctx.fill();
    //   }
    //   return document.body.appendChild(canvas);
    // };

    // drawStars()

      // Render Loop
  function render(){
    executeMovement()
    renderer.render(scene, camera)
  }

  function animate(){
    requestAnimationFrame(animate)
    alien.rotation.x -= alienRollingSpeed
    if(alien.position.y <= 1.8){
      bounceValue=(Math.random()*0.04)+0.005
    }
    // alien.position.y += bounceValue
    alien.position.x = THREE.Math.lerp(alien.position.x, currentLane, 2*clock.getDelta())
    bounceValue -= gravity
    // planet.rotation. x += 0.008
    render()

  }

  animate()

//END
  }





