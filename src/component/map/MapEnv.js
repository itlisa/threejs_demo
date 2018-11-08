import { Timer } from '@jusfoun-vis/common';
import { InteractiveGroup } from '@jusfoun-vis/threejs-common';
import {
  General3DEnv,
  GeneralMap,
  LinearScale
} from '@jusfoun-vis/threejs-chart';
import {
  UA, HP
} from '../common/MathConstant';
import GeoJSON_350100 from './350100.geo.json';

class MapEnv extends General3DEnv {
  constructor (option) {
    super(option);
    this.initialize();
  }

  _initLights () {
    const me = this;
    // 创建点光源
    const c = 0xFFFFFF;
    const c2 = 0.8;
    const c3 = false;
    const c4 = 100;
    me.addPointLight(c, .5, 1800.0 * c2, 0.0 * c2, 0.0 * c2, c3, c4);
    me.addPointLight(c, 1., 0.0 * c2, 800.0 * c2, 0.0 * c2, c3, c4);
  }
  _initObjects () {
    const me = this;
    // 自定义物件
    const mainGroup = new InteractiveGroup();
    mainGroup.rotation.x = -HP;
    mainGroup.position.x = 110;
    mainGroup.position.y = -80;
    me._mainGroup = mainGroup;
    me.addObject(mainGroup);
    // 地图
    const generalMap = new GeneralMap({
      mapData: GeoJSON_350100,
      scaleX: 300 * 1.1,
      scaleY: 300 * 1.0,
      scaleZ: 35,
      fillColor: 0x2287CE,
      fillOpacity: 0.85,
      fillSpecular: 0x222222,
      strokeColor: 0x1566C2,
      highlightColor: 0x39C7D2,
      showLabels: false,
      useRank: false,
      isChina: false,
      labelLockZ: false
    });
    generalMap.appear();
    generalMap.addObject();
    me._generalMap = generalMap;
    me._map = generalMap.map;
    console.log(generalMap);
    mainGroup.addObject(generalMap);
    // 定时器
    const nextTimer = new Timer(1000 * 2, 1);
    nextTimer.on('timerComplete', e => {
      if (me._autoPlay) {
        nextTimer.reset();
        nextTimer.start();
      }
    });
    me._nextTimer = nextTimer;
    // 比例尺
    const heightScale = new LinearScale().range(10, 100);
    me._heightScale = heightScale;
    // 创建随机的测试数据
    // me._createRandomData();
  }

  _autoPlay = false;
  get autoPlay () {
    return this._autoPlay;
  }

  set autoPlay (value) {
    const me = this;
    me._autoPlay = value;
  }

  _items = false;
  get items () {
    return this._items;
  }

  set items (value) {
    const me = this;
    me._items = value;
    // 找寻极值
    let minDataAmount = Infinity;
    let maxDataAmount = -Infinity;
    value.forEach((item) => {
      const dataAmount = item.dataAmount;
      if (minDataAmount > dataAmount) minDataAmount = dataAmount;
      if (maxDataAmount < dataAmount) maxDataAmount = dataAmount;
    });
    me._heightScale.domain(minDataAmount, maxDataAmount);
  }

  render () {
    const me = this;
    if (me._autoRotation) {
      me.scene.rotation.y += -0.1 * UA;
    }
  }

  dispose () {
    this.renderer.dispose();
  }
}

export default MapEnv;
