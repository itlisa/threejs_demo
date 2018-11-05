import React, { Component } from 'react';
import * as THREE from 'three';
import Orbitcontrols from 'three-orbitcontrols';
import nx from './NiagaraFalls3/negx.jpg';
import px from './NiagaraFalls3/posx.jpg';
import ny from './NiagaraFalls3/negy.jpg';
import py from './NiagaraFalls3/posy.jpg';
import nz from './NiagaraFalls3/negz.jpg';
import pz from './NiagaraFalls3/posz.jpg';

/**
 * 环境贴图demo
 * */
class Register extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div ref={'box'}>
        222222222222222222
      </div>
    );
  }

  componentDidMount () {
    const box = this.refs.box;
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(new THREE.Color(0xfff000));
    box.appendChild(renderer.domElement);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(100, 20, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    const scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader().load([px, nx, py, ny, pz, nz]);
    const light = new THREE.AmbientLight(0x606060);
    light.position.set(1, 1, 1);
    scene.add(light);
    //平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    // let planeGeometry = new THREE.PlaneGeometry(200, 200, 10, 10);
    // let geoMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc, wireframe: false});
    // let mesh = new THREE.Mesh(planeGeometry, geoMaterial);
    // mesh.rotation.x = -0.5 * Math.PI;
    // mesh.position.set(0, 0, -20);
    // scene.add(mesh);
    const sphereGeometry = new THREE.SphereGeometry(20, 100, 100);
    const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, envMap: scene.background});
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.set(20, 20, 0);
    scene.add(sphereMesh);
    const orbitcontrols = new Orbitcontrols(camera, renderer.domElement);
    orbitcontrols.autoRotate = true;
    renderer.render(scene, camera);
    //
    // let texture1 = new THREE.TextureLoader().load(img);
    // let texture2 = new THREE.TextureLoader().load(img);
    // let geometry = new THREE.BoxGeometry(60, 60, 10, 30, 30, 30);
    // let material = new THREE.MeshPhongMaterial({
    //   map: texture2,
    //   bumpMap: texture1,
    //   bumpScale: 0.3
    // });
    // let boxMesh = new THREE.Mesh(geometry, material);
    // boxMesh.position.set(-30, 30, 0);
    // scene.add(boxMesh);
    // let guiFields = {
    //   "bumpScale": 0.3
    // };
    // function initGUI() {
    //   const gui = new dat.GUI();
    //   gui.add(guiFields, 'bumpScale', 0, 1).onChange(function (e) {
    //     boxMesh.material.bumpScale = e;
    //   });
    //
    // }
    //
    // initGUI();
    function animate () {
      renderer.render(scene, camera);
      orbitcontrols.update();
      requestAnimationFrame(animate);
    }

    animate();
  }
}

export default Register;
