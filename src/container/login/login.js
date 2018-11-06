import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import Stats from 'stats.js';
import * as dat from 'dat.gui';
import { createStore } from 'redux';
import reducer from './reducer';

/**
 * 绘制自定义3d图形
 * */
class Login extends Component {
  constructor () {
    super();
  };

  render () {
    return (
      <div ref='webglbox' className={'aa'}></div>
    );
  }

  renderer = '';

  componentDidMount () {
    const store = createStore(reducer);
    store.dispatch({type: 'INCREMENT'});
    console.log(store.getState());
    // const listenerArr = [];
    store.subscribe((listener) => {
      console.log(listener);
    });
    const webGlBox = this.refs.webglbox;
    // 生成3d渲染器，设置渲染器宽高背景色
    let renderer = this.renderer;
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}); // 消除锯齿效果
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x333333);
    webGlBox.appendChild(renderer.domElement);
    // 创建场景
    const scene = new THREE.Scene();
    // 添加相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(100, 100, 100);
    // 设置光源
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    //设置group组
    const group = new THREE.Group();
    scene.add(group);
    // 创建面
    const planeGeomery = new THREE.PlaneGeometry(400, 400, 10, 10);
    const colors = ['0x000000', '0xffffff'];
    let n;
    for (let i = 0; i < planeGeomery.faces.length; i++) {
      n = i % 2;
      planeGeomery.faces[i].color.setHex(colors[n]);
    }
    // geom.computeVertexNormals();
    // geom.computeFaceNormals();
    // geom.computeMorphNormals();
    const cubeMatetial = new THREE.MeshBasicMaterial({wireframe: false, vertexColors: THREE.FaceColors});
    const planeMesh = new THREE.Mesh(planeGeomery, cubeMatetial);
    planeMesh.rotation.x = -0.5 * Math.PI;
    planeMesh.position.set(0, 0, -20);
    group.add(planeMesh);
    // 创建自定义几何图形
    const vertices = [
      new THREE.Vector3(50, 0, 0),
      new THREE.Vector3(50, 0, 50),
      new THREE.Vector3(50, 100, 0),
      new THREE.Vector3(50, 100, 50),
      new THREE.Vector3(0, 0, 50),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 100, 50),
      new THREE.Vector3(0, 100, 0)
    ];
    const faces = [
      new THREE.Face3(0, 2, 1),
      new THREE.Face3(2, 3, 1),
      new THREE.Face3(4, 6, 5),
      new THREE.Face3(6, 7, 5),
      new THREE.Face3(4, 5, 1),
      new THREE.Face3(5, 0, 1),
      new THREE.Face3(7, 6, 2),
      new THREE.Face3(6, 3, 2),
      new THREE.Face3(5, 7, 0),
      new THREE.Face3(7, 2, 0),
      new THREE.Face3(1, 3, 4),
      new THREE.Face3(3, 6, 4)
    ];
    const geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    const geomMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: false,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      depthWrite: true
    });
    const geomMesh = new THREE.Mesh(geom, geomMaterial);
    geomMesh.position.set(-50, 1, -50);
    geomMesh.scale.set(0.5, 0.5, 0.5);
    group.add(geomMesh);
    // 添加调试工具
    const guiFields = {
      opacity: 0.8
    };

    function initGui () {
      const gui = new dat.GUI();
      gui.add(guiFields, 'opacity', 0, 1).onChange(function (e) {
        geomMesh.material.opacity = e;
      });
    }

    initGui();
    // 添加边框
    // let cubeEdges = new THREE.EdgesGeometry(cubeGeometry, 1);
    // let edgesMtl = new THREE.LineBasicMaterial({color: 0xffffff});
    // let cubeLine = new THREE.LineSegments(cubeEdges, edgesMtl);
    // cube.add(cubeLine);
    // cube.castShadow = true;
    // 初始化性能插件
    let stats;
    const initStats = function () {
      stats = new Stats();
      document.body.appendChild(stats.dom);
    };
    initStats();
    // 添加控制器
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = false;
    renderer.render(scene, camera);

    function animate () {
      orbitControls.update();
      renderer.render(scene, camera);
      //更新性能插件
      stats.update();
      requestAnimationFrame(animate);
    }

    animate();
  }
}

export default Login;
