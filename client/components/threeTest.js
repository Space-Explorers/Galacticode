import React, {Component} from 'react'
import * as THREE from 'three'

class ThreeScene extends Component {
  constructor() {
    super()
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      scene: new THREE.Scene()
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    this.resize()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.state.width / this.state.height,
      0.1,
      1000
    )
    this.camera.position.z = 4
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({antialias: true})
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(this.state.width, this.state.height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    const geometry = new THREE.SphereGeometry(1, 10, 10)
    const material = new THREE.MeshBasicMaterial({color: '#433F81'})
    this.cube = new THREE.Mesh(geometry, material)
    this.state.scene.add(this.cube)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.state.scene, this.camera)
  }

  resize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
    this.renderer.setSize(this.state.width, this.state.height)
    var aspectRatio = window.innerWidth / window.innerHeight
    this.camera.aspect = aspectRatio
    this.camera.updateProjectionMatrix()
  }

  render() {
    return (
      <div
        style={{width: '400px', height: '400px'}}
        ref={mount => {
          this.mount = mount
        }}
      />
    )
  }
}

export default ThreeScene
