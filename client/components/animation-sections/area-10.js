/* eslint  no-underscore-dangle: ["error", { "allowAfterThis": true }]*/

import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import cx from 'classnames';
import baseStyle from './base.scss';
import style from './area-10.scss';
import { Animate, AnimateWithMask } from './base-animate';

// image
import bgImg from '../../../static/img/area-10/background.png';
import titleImg from '../../../static/img/area-10/title.png';
import ship01Img from '../../../static/img/area-10/3D/boat.png';
import ship02Img from '../../../static/img/area-10/2D/boat.png';
import ballImg from '../../../static/img/area-10/3D/ball.png';
import ballMaskImg from '../../../static/img/area-10/3D/ball-mask.png';
import circleImg from '../../../static/img/area-10/2D/cirle.png';
import netImg from '../../../static/img/area-10/2D/rope.png';
import netBgImg from '../../../static/img/area-10/2D/rope-mask.png';
import floatImg from '../../../static/img/area-10/2D/float.png';
import floatBgImg from '../../../static/img/area-10/2D/float-mask.png';
import textImg from '../../../static/img/area-10/3D/word.png';
import fishImg from '../../../static/img/area-10/2D/fish.png';

function getNetAnimationData(toStartAnimation) {
  return {
    duration: 1500,
    delay: 0,
    animation: {
      mask: toStartAnimation ? { opacity: 1, top: '0%' } : { opacity: 1, top: '-100%' },
      img: toStartAnimation ? { opacity: 1, top: '0%' } : { opacity: 1, top: '100%' },
    },
    bgImgSrc: netBgImg,
    imgSrc: netImg,
    style: {
      img: style.net,
      mask: style.mask,
    },
  };
}

function getFloatAnimationData(toStartAnimation) {
  return {
    duration: 1000,
    delay: 0,
    animation: {
      mask: toStartAnimation ? { opacity: 1, left: '0%' } : { opacity: 1, left: '-100%' },
      img: toStartAnimation ? { opacity: 1, left: '0%' } : { opacity: 1, left: '100%' },
    },
    bgImgSrc: floatBgImg,
    imgSrc: floatImg,
    style: {
      img: style.float,
      mask: style.mask,
    },
  };
}

function getTextAnimationData(toStartAnimation) {
  let animation = {
    opacity: 0,
  };
  const delay = 0;
  const duration = 500;

  if (toStartAnimation) {
    animation = {
      opacity: 1,
    };
  }

  return {
    animation,
    delay,
    duration,
    className: style.word,
    imgSrc: textImg,
  };
}

function getFishAnimationData(toStartAnimation) {
  let animation = {
    opacity: 0,
  };
  const delay = 0;
  const duration = 1000;

  if (toStartAnimation) {
    animation = {
      opacity: 1,
    };
  }

  return {
    animation,
    delay,
    duration,
    className: style.fish,
    imgSrc: fishImg,
  };
}

function getShip02AnimationData(toStartAnimation) {
  let animation;
  const delay = 300;
  const duration = 1000;

  if (toStartAnimation) {
    animation = {
      left: '76.1%',
    };
  }

  return {
    animation,
    delay,
    duration,
    className: style.ship02,
    imgSrc: ship02Img,
    easing: 'ease-in-out',
  };
}

function getCircleAnimationData(toStartAnimation) {
  const delay = 0;
  const duration = 500;
  const animation = toStartAnimation ? { opacity: 1 } : { opacity: 0 };

  return {
    animation,
    delay,
    duration,
    className: style.circle,
    imgSrc: circleImg,
  };
}

function getBallAnimationData(toStartAnimation) {
  return {
    duration: 1000,
    delay: 1000,
    animation: {
      mask: toStartAnimation ? { opacity: 1, left: '0%' } : { opacity: 1, left: '-100%' },
      img: toStartAnimation ? { opacity: 1, left: '0%' } : { opacity: 1, left: '100%' },
    },
    bgImgSrc: ballMaskImg,
    imgSrc: ballImg,
    easing: 'ease-in-out',
    style: {
      img: style.ball,
      mask: style['ball-mask'],
    },
  };
}

function getShip01AnimationData(toStartAnimation) {
  const baseHeight = 501;
  const baseWidth = 414;
  const delay = 0;
  const duration = 2000;
  const animation = toStartAnimation ? { top: `${(98 / baseHeight) * 100}%`, left: `${(274 / baseWidth) * 100}%` } : { top: '80%', left: '-40%' };

  return {
    animation,
    delay,
    duration,
    className: style.ship01,
    imgSrc: ship01Img,
    easing: 'ease-in-out',
  };
}

class Area extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toAnimateShip01: false,
      toAnimateBall: false,
      toAnimateCircle: false,
      toAnimateShip02: false,
      toAnimateFloat: false,
      toAnimateNet: false,
      toAnimateFish: false,
      toAnimateText: false,
    };
    this.onChange = this._onChange.bind(this);
    this.onBallAnimationFinish = this._onAnimationStart.bind(this, 'circle');

    this._onCircleAnimationFinish = () => {
      this._onAnimationStart('ship02');
      this._onAnimationStart('float');
    };
    this.onCircleAnimationFinish = this._onCircleAnimationFinish.bind(this);
    this.onFloatAnimationFinish = this._onAnimationStart.bind(this, 'net');
    this.onNetAnimationFinish = this._onAnimationStart.bind(this, 'fish');
    this.onFishAnimationFinish = this._onAnimationStart.bind(this, 'text');
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _onChange(isVisible) {
    if (isVisible && this._isMounted) {
      this.setState({
        toAnimateShip01: true,
        toAnimateBall: true,
      });
    }
  }

  _onAnimationStart(target) {
    switch (target) {
      case 'circle':
        this.setState({
          toAnimateCircle: true,
        });
        break;
      case 'ship02':
        this.setState({
          toAnimateShip02: true,
        });
        break;
      case 'float':
        this.setState({
          toAnimateFloat: true,
        });
        break;
      case 'net':
        this.setState({
          toAnimateNet: true,
        });
        break;
      case 'fish':
        this.setState({
          toAnimateFish: true,
        });
        break;
      case 'text':
        this.setState({
          toAnimateText: true,
        });
        break;
      default:

    }
  }

  render() {
    const { toAnimateShip01, toAnimateBall, toAnimateCircle,
      toAnimateShip02, toAnimateFloat, toAnimateNet,
      toAnimateFish, toAnimateText } = this.state;

    return (
      <div className={baseStyle.area} style={{ backgroundColor: '#738498', marginTop: '-2px' }}>
        <div className={baseStyle.container}>
          <img className={style.bg} src={bgImg} role="presentation" />
          <span className={baseStyle['seo-hidden']}>一艘延繩釣，一年進帳3千萬</span>
          <img className={cx(style.title, baseStyle['ab-center'])} src={titleImg} alt="一艘年繩釣，一年進帳3千萬/" />
          <VisibilitySensor
            onChange={this.onChange}
            active={!toAnimateShip01}
            partialVisibility
            minTopValue={300}
          >
            <div
              className={baseStyle['animation-block']}
            >
              <Animate
                {...getShip01AnimationData(toAnimateShip01)}
                onAnimationFinish={toAnimateShip01 ? this.onShip01AnimationFinish : undefined}
              />
              <AnimateWithMask
                {...getBallAnimationData(toAnimateBall)}
                onAnimationFinish={toAnimateBall ? this.onBallAnimationFinish : undefined}
              />
              <Animate
                {...getTextAnimationData(toAnimateText)}
              />
              <Animate
                {...getCircleAnimationData(toAnimateCircle)}
                onAnimationFinish={toAnimateCircle ? this.onCircleAnimationFinish : undefined}
              >
                <Animate
                  {...getShip02AnimationData(toAnimateShip02)}
                />
                <AnimateWithMask
                  {...getFloatAnimationData(toAnimateFloat)}
                  onAnimationFinish={toAnimateFloat ? this.onFloatAnimationFinish : undefined}
                />
                <AnimateWithMask
                  {...getNetAnimationData(toAnimateNet)}
                  onAnimationFinish={toAnimateNet ? this.onNetAnimationFinish : undefined}
                />
                <Animate
                  {...getFishAnimationData(toAnimateFish)}
                  onAnimationFinish={toAnimateFish ? this.onFishAnimationFinish : undefined}
                />
              </Animate>
            </div>
          </VisibilitySensor>
          <div className={cx(baseStyle['ab-center'], style.annotation)}>
            <span>資料來源：業界提供</span>
          </div>
        </div>
      </div>
    );
  }

}
export default Area;
