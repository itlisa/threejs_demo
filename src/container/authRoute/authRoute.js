import React, {Component} from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import {OBJLoader} from 'three-obj-mtl-loader';
import * as dat from 'dat.gui';

/**
 * @description:导入3d模型
 *
 * */
class AuthRoute extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div ref={'box'}></div>
    );
  }

  componentDidMount () {
    const domEle = this.refs.box;
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(1474, 600);
    // renderer.setClearColor(new THREE.Color(0xfff000));
    domEle.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x373470);
    scene.fog = new THREE.Fog(0xffffff, 100, 300);// 雾效果
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 15, 100);
    const light = new THREE.AmbientLight({color: 0xffffff});
    light.position.set(1, 1, 1);
    scene.add(light);
    const dLight = new THREE.DirectionalLight({color: 0xffffff});
    dLight.position.set(1, 1, 1).normalize();
    scene.add(dLight);
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.autoRotate = true;
    renderer.render(scene, camera);
    const guiFields = {
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    };
    const gui = new dat.GUI();
    gui.add(guiFields, 'scaleX', 0, 2 * Math.PI).onChange(function (e) {
      OBJ.rotation.x = e;
    });
    gui.add(guiFields, 'scaleY', 0, 2 * Math.PI).onChange(function (e) {
      OBJ.rotation.y = e;
    });
    gui.add(guiFields, 'scaleZ', 0, 2 * Math.PI).onChange(function (e) {
      OBJ.rotation.z = e;
    });
    const loader = new OBJLoader();
    // 导入文件面.obj
    // loader.load('/static/module/line.obj', function (object) {
    //   object.children[0].geometry.computeBoundingBox();
    //   object.children[0].geometry.center();
    //   object.children.map(function (child) {
    //     child.material.transparent = true;
    //     child.material.opacity = 0.4;
    //     child.material.color.set(0xFFFFFF);
    //   });
    //   object.scale.set(0.2, 0.2, 0.2); // 对象缩放
    //   scene.add(object);
    // });
    // 导入猪.obj
    let geometry = '';
    let pointGeometry = '';
    let line = '';
    const OBJ = new THREE.Object3D();
    loader.load('/static/module/pig02.obj', function (object) {
      geometry = object.children[0].geometry;
      pointGeometry = new THREE.Points(geometry, new THREE.MeshBasicMaterial({
        color: 0xffffff,
        size: 1,
        wireframe: true,
        transparent: true,
        opacity: 1
      }));
      OBJ.add(pointGeometry);
      const Wireframe = new THREE.WireframeGeometry(geometry); //线框
      line = new THREE.LineSegments(Wireframe, new THREE.MeshBasicMaterial({
        color: 0xffffff,
        lineWidth: 1,
        transparent: true,
        opacity: 0.1
      })); // 线段
      OBJ.add(line);
      OBJ.scale.set(0.1, 0.2, 0.1);
      OBJ.rotation.set(0, 0.6, 0);
      scene.add(OBJ);
    });
    const geometrys = new THREE.SphereBufferGeometry(100, 100, 100);
    const wireframe = new THREE.WireframeGeometry(geometrys);
    const lines = new THREE.LineSegments(wireframe);
    lines.material.depthTest = false;
    lines.material.opacity = 0.25;
    lines.material.transparent = true;
    lines.scale.set(0.1, 0.2, 0.1);
    lines.position.y = 8;
    scene.add(lines);

    function animate () {
      orbitControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();
  }
}

export default AuthRoute;
