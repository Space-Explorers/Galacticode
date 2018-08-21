// // Create an empty scene
// // import * as THREE from 'three'
// import * as CANNON from 'cannon'


// export default function testingCannon(){
//   const demo = new CANNON.Demo()

//   demo.addScene(function(){
//     const world = demo.getWorld()

//     const mass = 5
//     const moonShape = new CANNON.Sphere(0.5)
//     const planetShape = new CANNON.Sphere(3.5)

//     const moon = new CANNON.Body({
//       mass: mass,
//       position: new CANNON.Vec3(5, 0 , 0)
//     })

//     moon.addShape(moonShape)

//     const planet = new CANNON.Body({mass:0})

//     planet.addShape(planetShape)

//     moon.velocity.set(0, 0, 8)
//     moon.linearDamping = 0.0

//     //gravity force on the moon
//     moon.preStep = function(){
//       const moon_to_planet = new CANNON.Vec3()
//       this.position.negate(moon_to_planet)


//       const distance = moon_to_planet.norm()
// //force is pointing in the moon planet direction
//       moon_to_planet.normalize()
//       moon_to_planet.mult(1500/Math.pow(distance,2), this.force)
//     }

//     world.addBody(moon)
//     world.addVisual(planet)
//   })
//   demo.start()
// }
