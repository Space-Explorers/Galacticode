import * as THREE from 'three'

window.game = window.game || {}

window.game.three = function () {
  let _three = {
    // Attributes

		// DOM container which will hold the final canvas element of THREE.js
		domContainer: null,
		// Camera size constraint to limit viewport e.g. for a user interface
		cameraSizeConstraint: null,
		// Scene, camera and renderer
		camera: null,
		scene: null,
		renderer: null,
		// Field of view default setting for the camera
		fov: 45,

    // Methods
    init: function(options){
      // Initialize the DOM container from the options or create a new one
			_three.domContainer = options && options.domContainer || document.createElement("div");
			// Set camera size
			_three.cameraSizeConstraint = {
				width: options && options.cameraSizeConstraint && options.cameraSizeConstraint.width || 0,
				height: options && options.cameraSizeConstraint && options.cameraSizeConstraint.height || 0
			};

			// Append new DOM container if needed
			if (!options || !options.domContainer) {
				document.body.appendChild(_three.domContainer);
			}

			// Basic scene and lights setup
      _three.setup();

      // Create the main perspective camera using default fov and camera size constraints
			_three.camera = new THREE.PerspectiveCamera(_three.fov, (window.innerWidth - _three.cameraSizeConstraint.width) / (window.innerHeight - _three.cameraSizeConstraint.height), 1, 15000);
			// Set the up vector to the Z axis so everything is aligned to the Cannon.js coordinate system
			_three.camera.up.set(0, 0, 1);

			// Define default WebGL renderer
			_three.renderer = new THREE.WebGLRenderer({ antialias: true });

			// Set the background color (HTML background will be used if this option is omitted)
			if (options && typeof options.rendererClearColor === "number") {
				_three.renderer.setClearColor(options.rendererClearColor, 1);
			}

			// Add window resize listener to keep screen size for the canvas
			_three.onWindowResize();
			window.addEventListener("resize", _three.onWindowResize, false);

			// Append the canvas element
			_three.domContainer.appendChild(_three.renderer.domElement);

    },
    destroy: function () {

    },
    setup: function(){
      // Setup main scene
      _three.scene = new THREE.Scene();
      _three.background = new THREE.Color( 0x252940 );


			// Call lights setup method defined in game.core.js if existing
			if (_three.setupLights) {
				_three.setupLights();
			}
    },
    render: function () {
      _three.renderer.render(_three.scene, _three.camera)
    },
    onWindowResize: function() {
			// Keep screen size when window resizes
			_three.camera.aspect = (window.innerWidth - _three.cameraSizeConstraint.width) / (window.innerHeight - _three.cameraSizeConstraint.height);
			_three.camera.updateProjectionMatrix();
			_three.renderer.setSize((window.innerWidth - _three.cameraSizeConstraint.width), (window.innerHeight - _three.cameraSizeConstraint.height));
    },
    createModel: function(){
      //Alien
      const alienGeometry = new THREE.DodecahedronGeometry( 0.2,1)
      const alienMaterial = new THREE.MeshStandardMaterial( { color: 0x883333, shading: THREE.FlatShading } )
      //const jumping = false

      // Create the Cannon.js geometry for the imported 3D model
			_three.createCannonGeometry(alienGeometry, scale);
			// Generate the halfExtents that are needed for Cannon.js
      model.halfExtents = _three.createCannonHalfExtents(alienGeometry);

      const alien = new THREE.Mesh( alienGeometry, alienMaterial );
     return alien
    },
    createCannonGeometry: function(geometry, scale){
      // Preparre translation properties
			let translateX;
			let translateY;
			let translateZ;

			// Get the bounding box for the provided geometry
			geometry.computeBoundingBox();

			// Center the imported model so the axis-aligned bounding boxes (AABB) and bounding spheres are generated correctly by Cannon.js
			translateX = -((geometry.boundingBox.size().x / 2) + geometry.boundingBox.min.x);
			translateY = -((geometry.boundingBox.size().y / 2) + geometry.boundingBox.min.y);
			translateZ = -((geometry.boundingBox.size().z / 2) + geometry.boundingBox.min.z);

			// Apply various matrix transformations to translate, rotate and scale the imported model for the Cannon.js coordinate system
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(translateX, translateY, translateZ));
			geometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2));
			geometry.applyMatrix(new THREE.Matrix4().makeScale(scale, scale, scale));
    },
    createCannonHalfExtents: function(geometry) {
			// The final bounding box also exsists so get its dimensions
			geometry.computeBoundingBox();

			// Return a Cannon vector to define the halfExtents
			return new CANNON.Vec3(
				(geometry.boundingBox.max.x - geometry.boundingBox.min.x) * 0.5,
				(geometry.boundingBox.max.y - geometry.boundingBox.min.y) * 0.5,
				(geometry.boundingBox.max.z - geometry.boundingBox.min.z) * 0.5
			);
		}
  }
}
//       // let alienRollingSpeed = 0
//       // let bounceValue = 0.01
//       // let gravity=0.005
//       // let leftLane=-1
//       // let rightLane=1
//       // let middleLane=0
//       // let currentLane

//       const scene = new THREE.Scene()
//       scene.background = new THREE.Color( 0x252940 );


//       const renderer = new THREE.WebGLRenderer({alpha: true})
//       renderer.shadowMap.enabled = true;//enable shadow
//       renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//       renderer.setClearColor(0x000000, 0)
//       renderer.setSize(window.innerWidth, window.innerHeight)
//       document.body.appendChild(renderer.domElement)

//       //Alien
//       const alienGeometry = new THREE.DodecahedronGeometry( 0.2,1)
//       const alienMaterial = new THREE.MeshStandardMaterial( { color: 0x883333, shading: THREE.FlatShading } )
//       //const jumping = false
//       const alien = new THREE.Mesh( alienGeometry, alienMaterial );
//       alien.castShadow=true;
//       alien.receiveShadow=false
//       alien.position.y=1.8
//       alien.position.z=4.8
//       currentLane = middleLane
//       alien.position.x = currentLane
//       scene.add( alien )



//       //keyboard Controls
//       const keyMap = [];
//       document.addEventListener('keydown', onDocumentKeyDown, true);
//       document.addEventListener('keyup', onDocumentKeyUp, true);
//       function onDocumentKeyDown(event) {
//         const keyCode = event.keyCode;
//         keyMap[keyCode] = true;
//       }
//       function onDocumentKeyUp(event) {
//         const keyCode = event.keyCode;
//         keyMap[keyCode] = false;
//       }
//       function executeMovement() {
//         let validMove = true;
//         if (keyMap[37] === true) { //left
//           console.log('left')
//           if (currentLane == middleLane) {
//             currentLane = leftLane;
//           } else if (currentLane == rightLane) {
//             currentLane = middleLane;
//           } else {
//             validMove = false;
//           }
//         } else if (keyMap[39] === true) { //right
//           console.log('Right')
//           if (currentLane == middleLane) {
//             currentLane = rightLane;
//           } else if (currentLane == leftLane) {
//             currentLane = middleLane;
//           } else {
//             validMove = false;
//           }
//         } else if (keyMap[38] === true) { //up, jump
//             console.log('up')
//             alienRollingSpeed=(0.008 * 26 / 0.2)/5
//         }else{
//           if(keyMap[40] === true){//down
//             alienRollingSpeed = .001
//           }
//         }
//         validMove = false;
//         if (validMove) {
//           bounceValue = 0.06;
//         }
//       }


//       // //createPlanet
//         const planetGeometry = new THREE.PlaneGeometry(5,5, 4,4)
//         const planetMaterial = new THREE.MeshStandardMaterial({
//           color: 0x5BBCF6,
//           shading: THREE.FlatShading
//         })

//         const planet = new THREE.Mesh(planetGeometry, planetMaterial)
//         planet.receiveShadow = true
//         planet.castShadow =false
//         planet.position.y = 0
//         // planet.rotation.x= -0.5 * Math.PI
//         planet.position.z = 4.8
//         scene.add(planet)




//        //lighting
//    const ambientLight = new THREE.AmbientLight(0x999999)
//    scene.add(ambientLight)

//     const light = new THREE.DirectionalLight(0xffffff, 1.5)
//     light.position.set(0,4,1);
//     light.castShadow = true;

//     scene.add(light)

//     //     // Stars in the backgrounds
//     // const drawStars = function() {
//     //   let canvas, ctx, i, j, sizeRandom;
//     //   canvas = document.createElement('canvas');
//     //   canvas.setAttribute('width', window.innerWidth);
//     //   canvas.setAttribute('height', window.innerHeight);
//     //   canvas.setAttribute('id', "stars");
//     //   ctx = canvas.getContext('2d');
//     //   ctx.fillStyle = "#A9D9E5";
//     //   for (i = j = 0; j <= 200; i = ++j) {
//     //     ctx.beginPath();
//     //     sizeRandom = Math.random() * 2;
//     //     ctx.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, sizeRandom, 0, 2 * Math.PI, 0);
//     //     ctx.fill();
//     //   }
//     //   return document.body.appendChild(canvas);
//     // };

//     // drawStars()

//       // Render Loop
//   function render(){
//     executeMovement()
//     renderer.render(scene, camera)
//   }

//   function animate(){
//     requestAnimationFrame(animate)
//     alien.rotation.x -= alienRollingSpeed
//     if(alien.position.y <= 1.8){
//       bounceValue=(Math.random()*0.04)+0.005
//     }
//     // alien.position.y += bounceValue
//     alien.position.x = THREE.Math.lerp(alien.position.x, currentLane, 2*clock.getDelta())
//     bounceValue -= gravity
//     // planet.rotation. x += 0.008
//     render()

//   }

//   animate()

// //END
//   }





