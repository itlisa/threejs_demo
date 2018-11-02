import React, {Component} from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import Stats from 'stats.js';
import * as dat from 'dat.gui';
import * as d3 from 'd3';
import BarChart from '../../component/timeLimit/TimeLimit';

/**
 * 绘制BARCHART图形
 * */

class CreateBar extends Component {

  constructor() {
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
    const width = 800;
    const height = 800;
    this._obj3D = obj3D;
    this._width = width;
    this._height = height;
    this.style = {
      position: 'absolute',
      top: 150,
      right: 0
    }
  };

  get obj3D() {
    return this._obj3D;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  set width(value) {
    this._width = value
  }

  render() {
    return (
      <div style={{background: '#333', position: 'relative', width: 1920, height: 1080}}>
        <BarChart/>
        <div ref='webglbox' style={this.style}></div>
      </div>

    )
  }

  renderer = '';

  createBar(data, color, i) {
    let geometry = new THREE.BoxBufferGeometry(20, data, 20);
    let material = new THREE.MeshPhongMaterial({
      color
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(20 * i, data / 2, 0);
    this.obj3D.add(mesh);
    this.obj3D.scale.set(1, 1, 1);
    this.obj3D.rotation.y = 2.3 * Math.PI;
  }

  componentDidMount() {
    this.width = 800;
    let webGlBox = this.refs.webglbox;
    // 生成3d渲染器，设置渲染器宽高背景色
    let renderer = this.renderer;
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true}); // 消除锯齿效果
    renderer.setSize(this.width, this.height);
    // renderer.setClearColor(0x333333);
    if (typeof window.devicePixelRatio === 'number')
      renderer.setPixelRatio(window.devicePixelRatio); //  设备上物理像素和设备独立像素的比 防止画面变模糊

    webGlBox.appendChild(renderer.domElement);
    // 创建场景
    let scene = new THREE.Scene();
    // 添加相机
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(120, 75, 120);

    // 设置光源
    let light = new THREE.DirectionalLight(0xffffff, 2);
    light.target = this.obj3D;
    light.position.set(50, 100, 140);
    scene.add(light);
    let ambientLight = new THREE.AmbientLight({color: 0x333333});
    ambientLight.position.set(1, 1, 1);
    // scene.add(ambientLight);
    /*
    *
    * 3D barChart
    *
    * */

    let datas = this.state.data;
    datas.sort((a, b) => {
      return a.value - b.value
    });
    let min = datas[0].value;
    let max = datas[datas.length - 1].value;
    let x = d3.scaleLinear()
      .domain([min, max])
      .range([10, 100]);

    for (let i = 0; i < datas.length; i++) {
      const color = i % 2 ? 0xffffff : 0x006dcb;
      this.createBar(x(datas[i].value), color, i, min, max)
    }
    scene.add(this.obj3D);

    let rotateY = {
      y: 0.5 * Math.PI,
      posX: 0,
      posY: 0,
      posZ: 0
    };
    let gui = new dat.GUI();
    let me = this;
    gui.add(rotateY, 'y', 0, 2 * Math.PI).onChange(function (e) {
      me.obj3D.rotation.y = e * Math.PI;
    });
    gui.add(rotateY, 'posX', -400, 400).onChange(function (e) {
      camera.position.x = e;
    });
    gui.add(rotateY, 'posY', -400, 400).onChange(function (e) {
      camera.position.y = e;
    });
    gui.add(rotateY, 'posZ', -400, 400).onChange(function (e) {
      camera.position.z = e;
    });

    // 添加控制器
    let orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = false;
    renderer.render(scene, camera);

    function animate() {
      orbitControls.update();
      renderer.render(scene, camera);
      //更新性能插件
      requestAnimationFrame(animate);
    }

    animate();
  }
}

export default CreateBar;
