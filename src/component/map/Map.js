import React, { Component } from 'react';
import MapEnv from './MapEnv';

class Map extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const me = this;
    return (
      <div ref={(ref) => me.domElement = ref}/>
    );
  }

  componentDidMount () {
    const me = this;
    const env = new MapEnv();
    env.resize(400, 400);
    me.domElement.appendChild(env.domElement);
    console.log(env);
    env.startRender();
    env.items = me.props.mapItems;
    env.autoPlay = true;
    // // env.next();
    me._env = env;
  }

  componentWillUnmount () {
    const me = this;
    const env = me._env;
    if (env) {
      env.stopRender();
      env.autoPlay = false;
      env.dispose();
    }
  }
}

export default Map;
