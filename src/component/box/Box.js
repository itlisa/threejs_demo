import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

class Map extends Component {
  constructor (props) {
    super(props);
    console.log(props);
    const me = this;
    const width = props.width || 500;
    const height = props.height || 500;
    me._renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    me._renderer.setSize(width, height);
    me._renderer.setClearColor(0x000000);
    me._scene = new THREE.Scene();
    me._camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    me._camera.position.set(100, 100, 100);
    me._width = width;
    me._height = height;
  }

  get renderer () {
    return this._renderer;
  }

  get domElement () {
    return this._renderer.domElement;
  }

  get width () {
    return this._width;
  }

  get height () {
    return this._height;
  }

  get scene () {
    return this._scene;
  }

  get camera () {
    return this._camera;
  }

  render () {
    return <div ref={'box'}></div>;
  }

  componentDidMount () {
    const me = this;
    const light = new THREE.AmbientLight(0xFFFFFF);
    light.position.set(1, 1, 1);
    const dLight = new THREE.DirectionalLight(0xffffff);
    dLight.position.set(100, 200, 50);
    me.scene.add(dLight);
    me.scene.add(light);
    const sphereBufferGeometry = new THREE.BoxBufferGeometry(60, 40, 40);
    const geoMesh = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true, transparent: true, opacity: 0.7});
    const mesh = new THREE.Mesh(sphereBufferGeometry, geoMesh);
    me.scene.add(mesh);
    me.refs.box.appendChild(me.domElement);
    me.renderer.render(me.scene, me.camera);
    console.log(me.scene);
    const orbitControls = new OrbitControls(me.camera, me.domElement);
    orbitControls.autoRotate = true;

    function animate () {
      me.renderer.render(me.scene, me.camera);
      orbitControls.update();
      requestAnimationFrame(animate);
    }

    animate();
  }
}

export default Map;
