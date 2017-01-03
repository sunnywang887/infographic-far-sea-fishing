/* eslint  no-underscore-dangle: ["error", { "allowAfterThis": true }]*/

import React, { Component, PropTypes } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import cx from 'classnames';
import { VelocityComponent } from 'velocity-react';
import style from './area-2.scss';
import { Animate } from './base-animate';
// image
import bgImg from '../../../static/img/area-2/background.png';
import earthImg from '../../../static/img/area-2/earth.png';
import shadowImg from '../../../static/img/area-2/shadow.png';
import canBgImg from '../../../static/img/area-2/can-mask.png';
import canImg from '../../../static/img/area-2/can.png';
import textImg from '../../../static/img/area-2/word.png';
import title01 from '../../../static/img/area-2/title-1.png';
import title02 from '../../../static/img/area-2/title-2.png';

require('velocity-animate');
require('velocity-animate/velocity.ui');

function getTextAnimationData(toStartAnimation) {
  const animation = toStartAnimation ? { opacity: 1 } : { opacity: 0 };

  return {
    animation,
    delay: 500,
    duration: 500,
    className: cx(style.word, style['ab-center']),
    imgSrc: textImg,
  };
}

function CanJsx({ delay, toStartAnimation, onAnimationFinish }) {
  const animation = toStartAnimation ? 'transition.bounceIn' : { opacity: 0 };

  return (
    <li>
      <img className={style['can-bg']} src={canBgImg} role="presentation" />
      <VelocityComponent
        animation={animation}
        duration={100}
        delay={delay}
        complete={onAnimationFinish}
      >
        <img className={style.can} src={canImg} role="presentation" />
      </VelocityComponent>
    </li>
  );
}

CanJsx.propTypes = {
  delay: PropTypes.number,
  onAnimationFinish: PropTypes.func,
  toStartAnimation: PropTypes.bool,
};

CanJsx.defaultProps = {
  delay: 500,
  onAnimationFinish: undefined,
  toStartAnimation: false,
};


function CansJsx({ delay = 0, number, toStartAnimation, onAnimationFinish }) {
  const cansNumber = number;
  const cansJsx = [];

  for (let index = 0; index < cansNumber; index += 1) {
    cansJsx.push(
      <CanJsx
        key={index}
        delay={delay + (100 * index)}
        toStartAnimation={toStartAnimation}
        onAnimationFinish={index === cansNumber - 1 ? onAnimationFinish : undefined}
      />,
    );
  }
  return (
    <ul>
      {cansJsx}
    </ul>
  );
}

CansJsx.propTypes = {
  delay: PropTypes.number,
  number: PropTypes.number,
  onAnimationFinish: PropTypes.func,
  toStartAnimation: PropTypes.bool,
};

CansJsx.defaultProps = {
  delay: 500,
  number: 10,
  onAnimationFinish: undefined,
  toStartAnimation: false,
};

class Area extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toAnimateCans: false,
      toAnimateText: false,
    };
    this.onChange = this._onChange.bind(this);
    this.onCansAnimationFinish = this._onAnimationStart.bind(this, 'text');
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
        toAnimateCans: true,
      });
    }
  }

  _onAnimationStart(target) {
    switch (target) {
      case 'text':
        this.setState({
          toAnimateText: true,
        });
        break;
      default:

    }
  }

  render() {
    const { toAnimateCans, toAnimateText } = this.state;

    return (
      <VisibilitySensor
        onChange={this.onChange}
        active={!toAnimateCans}
        partialVisibility
        minTopValue={300}
      >
        <div className={style.area} style={{ backgroundColor: '#E5E2E2' }}>
          <div className={style.container}>
            <img className={style.bg} src={bgImg} role="presentation" />
            <h3>
              <span className={style['seo-hidden']}>台灣一年的鮪魚罐繞地球一圈半！</span>
              <img className={cx(style.title01, style['ab-center'])} src={title01} alt="台灣一年的鮪魚罐繞地球一圈半！" />
            </h3>
            <p>
              <span className={style['seo-hidden']}>每年製造8億個鮪魚罐頭</span>
              <img className={cx(style.title02, style['ab-center'])} src={title02} alt="每年製造8億個鮪魚罐頭" />
            </p>
            <div
              className={style['animation-block']}
            >
              <div className={style['earth-cans-anima']}>
                <img className={style.earth} src={earthImg} role="presentation" />
                <img className={style.shadow} src={shadowImg} role="presentation" />
                <div className={style['cans-block']}>
                  <div className={style.cans}>
                    <CansJsx
                      toStartAnimation={toAnimateCans}
                      number={14}
                    />
                    <CansJsx
                      delay={2000}
                      toStartAnimation={toAnimateCans}
                      number={7}
                      onAnimationFinish={toAnimateCans ? this.onCansAnimationFinish : undefined}
                    />
                  </div>
                </div>
              </div>
              <Animate
                {...getTextAnimationData(toAnimateText)}
              />
            </div>
            <div className={cx(style.annotation, style['ab-center'])}>
              <span>資料來源：由豐群水產提供，各大洋區統整資料目前到2014年。</span>
            </div>
          </div>
        </div>
      </VisibilitySensor>
    );
  }
}

export default Area;
