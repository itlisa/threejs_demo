import React, {Component} from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'
import *as dat from 'dat.gui';

/**
 * @description:导入3d模型
 *
 * */
class AuthRoute extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div ref={'box'}></div>
    )
  }

  componentDidMount() {
    /*
    * if(Detector.webgl){
        //alert('浏览器支持');
        //浏览器支持，我们就做初始化工作。不然js处理半天，浏览器不支持也白搭
        init();
        animate();
    }else{
        alert('浏览器不支持');
    }

    * */
    let domEle = this.refs.box;
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(1474, 600);
    // renderer.setClearColor(new THREE.Color(0xfff000));
    domEle.appendChild(renderer.domElement);
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(-29, 36, -50);
    let light = new THREE.AmbientLight({color: 0xffffff});
    light.position.set(1, 1, 1);
    scene.add(light);
    let dLight = new THREE.DirectionalLight({color: 0xffffff});
    dLight.position.set(1, 1, 1).normalize();
    scene.add(dLight);
    let orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = false;
    renderer.render(scene, camera);

    let guiFields = {
      positionX:0,
      positionY:0,
      positionZ:0
    };
    let gui = new dat.GUI();
    gui.add(guiFields, 'positionX', -1000, 1000).onChange(function (e) {
      camera.position.x = e;
    });
    gui.add(guiFields, 'positionY', -1000, 1000).onChange(function (e) {
      camera.position.y = e;
    });
    gui.add(guiFields, 'positionZ', -1000, 1000).onChange(function (e) {
      camera.position.z = e;
    });
    let loader = new OBJLoader();
    // 导入文件面.obj
    loader.load('/static/module/face.obj', function (object) {
      let box = new THREE.Box3();
      box.expandByObject(object);
      box.getCenter();
      object.children[0].geometry.computeBoundingBox();
      object.children[0].geometry.center();
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = 0.6;
          child.material.color.set(0x1f7ccc);
        }
      });
      object.scale.set(0.2, 0.2, 0.2); // 对象缩放
      scene.add(object);
    });

    // 导入文件线.obj
    loader.load('/static/module/line.obj', function (object) {
      let box = new THREE.Box3();
      box.expandByObject(object);
      box.getCenter();
      object.children[0].geometry.computeBoundingBox();
      object.children[0].geometry.center();
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material.transparent = true;
          child.material.opacity = 0.6;
          child.material.color.set(0x1f7ccc);

        }
      });
      object.scale.set(0.2, 0.2, 0.2); // 对象缩放
      scene.add(object);
    });

    function animate() {
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();
  }
}

export default AuthRoute;