import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import {
  InteractiveGroup,
} from '@jusfoun-vis/threejs-common';
import {
  GraphicUtil
} from '@jusfoun-vis/threejs-chart';
import { HP } from '../common/MathConstant';
import Image_info_panel_background from './info-panel-background-2.png';
const infoPanelBackgroundImage = new Image();
infoPanelBackgroundImage.src = Image_info_panel_background;


class InfoPanel extends InteractiveGroup {
  constructor () {
    super();
    const me = this;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      transparent: true
    }));
    me._sprite = sprite;
    me.addObject(sprite);
    me.opacity = 0;
  }

  _item = undefined;
  get item () {
    return this._item;
  }

  set item (value) {
    const me = this;
    me._item = value;
    if (infoPanelBackgroundImage.width * infoPanelBackgroundImage.height === 0) {
      infoPanelBackgroundImage.onload = function () {
        me.item = value;
      };
      return;
    }
    // 放大系数
    const scale = 2;
    const width = infoPanelBackgroundImage.width;
    const height = infoPanelBackgroundImage.height;
    const sprite = me._sprite;
    const canvas = GraphicUtil.canvas;
    canvas.width = width * scale;
    canvas.height = height * scale;
    const context = canvas.getContext('2d');
    context.textBaseline = 'hanging';
    context.drawImage(infoPanelBackgroundImage, 0, 0, canvas.width, canvas.height);
    context.font = `bold ${Math.round(24 * scale)}px 微软雅黑`;
    context.fillStyle = '#FFF';
    context.fillText(value.title || '未知', Math.round(38 * scale), Math.round(22 * scale));
    context.font = `${Math.round(24 * scale)}px Impact`;
    context.fillStyle = '#ff6c00';
    context.fillText(value.creditIndex || 'N/A', Math.round(129 * scale), Math.round(64 * scale));
    context.font = `${Math.round(24 * scale)}px Impact`;
    context.fillStyle = '#ff6c00';
    context.fillText(value.dataAmount || 'N/A', Math.round(129 * scale), Math.round(99 * scale));
    const image = new Image();
    image.src = canvas.toDataURL();
    image._width = canvas.width;
    image._height = canvas.height;
    const texture = new THREE.Texture(image);
    texture.needsUpdate = true;
    sprite.material.map = texture;
    sprite.scale.set(
      canvas.width / 2 / scale,
      canvas.height / 2 / scale,
      1
    );
    sprite.position.z = canvas.height / 4 / scale;
  }

  set opacity (value) {
    const me = this;
    me._sprite.material.opacity = value;
  }

  appear (delay, duration, callback) {
    const me = this;
    delay = delay || 0;
    duration = duration || 1000;
    if (me._tween) me._tween.stop();
    me._tween = new TWEEN.Tween({t: 0})
      .to({t: 1}, duration)
      .delay(delay)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(o => {
        me.opacity = o.t;
      })
      .onComplete(() => {
        me._tween = undefined;
        if (typeof callback === 'function') {callback.call(me, me);}
      })
      .start();
  }

  disappear (delay, duration, callback) {
    const me = this;
    delay = delay || 0;
    duration = duration || 1000;
    if (me._tween) me._tween.stop();
    me._tween = new TWEEN.Tween({t: 1})
      .to({t: 0}, duration)
      .delay(delay)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(o => {
        me.opacity = o.t;
      })
      .onComplete(() => {
        me._tween = undefined;
        if (typeof callback === 'function') {callback.call(me, me);}
      })
      .start();
  }
}

export default InfoPanel;
