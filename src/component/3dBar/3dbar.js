import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import * as d3 from 'd3';
import * as dat from 'dat.gui';
import { Timer } from '@jusfoun-vis/common';

/**
 * 绘制BARCHART图形
 * */
class Bar extends Component {
  constructor () {
    super();
    this.state = {
      data: [
        {
          name: '威县',
          value: 100
        },
        {
          name: '洛宁',
          value: 400
        },
        {
          name: '威宁',
          value: 700
        },
        {
          name: '凉州',
          value: 1000
        },
        {
          name: '尼木',
          value: 1300
        },
        {
          name: '红安',
          value: 1600
        },
        {
          name: '山阳',
          value: 1900
        },
        {
          name: '岳西',
          value: 100
        }
      ]
    };
    const obj3D = new THREE.Object3D();
    const width = 200;
    const height = 300;
    this._obj3D = obj3D;
    this._width = width;
    this._height = height;
  };

  get obj3D () {
    return this._obj3D;
  }

  _fontObj = new THREE.Object3D();
  get fontObj () {
    return this._fontObj;
  }

  get width () {
    return this._width;
  }

  get height () {
    return this._height;
  }

  set width (value) {
    this._width = value;
  }

  _fontSize = 50;
  get fontSize () {
    return this._fontSize;
  }

  set fontSize (value) {
    this._fontSize = value;
  }

  render () {
    return (
      <div ref='webglbox'></div>
    );
  }

  renderer = '';

  createBar (data, color, i, obj) {
    const me = this;
    const fontSize = me.fontSize;
    const geometry = new THREE.BoxBufferGeometry(20, data, 20);
    const material = new THREE.MeshPhongMaterial({
      color
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(20 * i, data / 2, 0);
    mesh.scale.set(0, 0, 0);
    me.obj3D.add(mesh);
    this.obj3D.scale.set(1, 1, 1);
    me.obj3D.rotation.y = 2.3 * Math.PI;
    me.fontObj.rotation.y = 2.3 * Math.PI;
    // me.fontObj.rotation.z = 0.1 * Math.PI;
    obj.box = mesh;
    const canvasText = me.createCanvasText(obj.name, '#ffffff');
    const planeGeometry = new THREE.PlaneBufferGeometry(fontSize, fontSize);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(canvasText),
      side: THREE.DoubleSide
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -0.1 * Math.PI;
    planeMesh.position.set(i * (fontSize - 30) + 10, 0, 40);
    // planeMesh.scale.set(0.1, 0.1, 0.1);
    me.fontObj.add(planeMesh);
  }

  createCanvasText (data, style) {
    console.log(style);
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const cxt = canvas.getContext('2d');
    cxt.beginPath();
    cxt.fillStyle = style;
    cxt.font = this.fontSize + 'px Verdana';
    cxt.fillText(data, 0, this.fontSize);
    cxt.fill();
    cxt.stroke();
    return canvas;
  }

  componentDidMount () {
    this.width = 800;
    const webGlBox = this.refs.webglbox;
    // 生成3d渲染器，设置渲染器宽高背景色
    let renderer = this.renderer;
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}); // 消除锯齿效果
    renderer.setSize(this.width, this.height);
    // renderer.setClearColor(0x333333);
    if (typeof window.devicePixelRatio === 'number') {
      renderer.setPixelRatio(window.devicePixelRatio); //  设备上物理像素和设备独立像素的比 防止画面变模糊
    }
    webGlBox.appendChild(renderer.domElement);
    // 创建场景
    const scene = new THREE.Scene();
    // 添加相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(120, 75, 120);
    // 设置光源
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.target = this.obj3D;
    light.position.set(50, 100, 140);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight({color: 0x333333});
    ambientLight.position.set(1, 1, 1);
    // scene.add(ambientLight);
    /*
    *
    * 3D barChart
    *
    * */
    const datas = this.state.data;
    datas.sort((a, b) => {
      return a.value - b.value;
    });
    const min = datas[0].value;
    const max = datas[datas.length - 1].value;
    const x = d3.scaleLinear()
      .domain([min, max])
      .range([10, 100]);
    for (let i = 0; i < datas.length; i++) {
      const color = i % 2 ? 0xffffff : 0x006dcb;
      this.createBar(x(datas[i].value), color, i, datas[i]);
    }
    this.fontObj.position.set(-7, -29, -9);
    scene.add(this.obj3D);
    scene.add(this.fontObj);
    const timer = new Timer(100, datas.length);
    let index = 0;
    timer.on('timer', function () {
      const box = datas[index].box;
      box.scale.set(1, 1, 1);
      index++;
    });
    timer.start();
    // 添加控制器
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = false;
    renderer.render(scene, camera);
    //添加调试工具
    const gui = new dat.GUI();
    const test = {
      posx: 0,
      posy: 0,
      posz: 0
    };
    const me = this;
    gui.add(test, 'posx', 0, Math.PI * 2).onChange(function (e) {
      me.fontObj.rotation.x = e;
    });
    gui.add(test, 'posy', 0, Math.PI * 2).onChange(function (e) {
      me.fontObj.rotation.y = e;
    });
    gui.add(test, 'posz', 0, Math.PI * 2).onChange(function (e) {
      me.fontObj.rotation.z = e;
    });

    function animate () {
      orbitControls.update();
      renderer.render(scene, camera);
      //更新性能插件
      requestAnimationFrame(animate);
    }

    animate();
  }
}

export default Bar;
