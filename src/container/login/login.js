import React, {Component} from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import Stats from 'stats.js';
import img from './timg.jpeg';
import * as dat from 'dat.gui';

/**
 * 绘制自定义3d图形
 * */

class Login extends Component {

  constructor() {
    super();
  };

  render() {
    return (
      <div ref='webglbox' className={'aa'}></div>
    )
  }

  renderer = '';

  componentDidMount() {
    let webGlBox = this.refs.webglbox;
    // 生成3d渲染器，设置渲染器宽高背景色
    let renderer = this.renderer;
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}); // 消除锯齿效果
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x333333);
    webGlBox.appendChild(renderer.domElement);
    // 创建场景
    let scene = new THREE.Scene();
    // 添加相机
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(100, 100, 100);
    // 设置光源
    let light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    //设置group组
    let group = new THREE.Group();
    scene.add(group);
    // 创建面
    let planeGeomery = new THREE.PlaneGeometry(400, 400, 10, 10);
    let colors = ['0x000000', '0xffffff'];

    let n;
    for (let i = 0; i < planeGeomery.faces.length; i++) {
      n = i % 2;
      planeGeomery.faces[i].color.setHex(colors[n]);
    }
    // geom.computeVertexNormals();
    // geom.computeFaceNormals();
    // geom.computeMorphNormals();
    let cubeMatetial = new THREE.MeshBasicMaterial({wireframe: false, vertexColors: THREE.FaceColors});
    let planeMesh = new THREE.Mesh(planeGeomery, cubeMatetial);
    planeMesh.rotation.x = -0.5 * Math.PI;
    planeMesh.position.set(0, 0, -20);
    group.add(planeMesh);

    // 创建自定义几何图形
    let vertices = [
      new THREE.Vector3(50, 0, 0), // 4
      new THREE.Vector3(50, 0, 50),// 5
      new THREE.Vector3(50, 100, 0),// 6
      new THREE.Vector3(50, 100, 50),// 7
      new THREE.Vector3(0, 0, 50),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 100, 50),
      new THREE.Vector3(0, 100, 0),
    ];
    let faces = [
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
      new THREE.Face3(3, 6, 4),
    ];

    let geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;

    let geomMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: false,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      depthWrite: true
    });
    let geomMesh = new THREE.Mesh(geom, geomMaterial);
    geomMesh.position.set(-50, 1, -50);
    geomMesh.scale.set(0.5, 0.5, 0.5);
    group.add(geomMesh);
    // 添加调试工具
    let guiFields = {
      opacity: 0.8
    };

    function initGui() {
      let gui = new dat.GUI();
      gui.add(guiFields, 'opacity', 0, 1).onChange(function (e) {
        geomMesh.material.opacity = e;
      })
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
    let initStats = function () {
      stats = new Stats();
      document.body.appendChild(stats.dom)
    };
    initStats();

    // 添加控制器
    let orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = false;
    renderer.render(scene, camera);

    function animate() {
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
