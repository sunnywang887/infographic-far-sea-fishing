/* eslint  no-underscore-dangle: ["error", { "allowAfterThis": true }]*/

import VisibilitySensor from 'react-visibility-sensor';
import cx from 'classnames';
import React, { Component } from 'react';

// lodash
import map from 'lodash/map';

// css
import baseStyle from './base.scss';
import style from './area-7.scss';

// image
import bgImg from '../../../static/img/area-7/background.png';
import title1 from '../../../static/img/area-7/title-1.png';
import title2 from '../../../static/img/area-7/title-2.png';
import title3 from '../../../static/img/area-7/title-3.png';
import shipImg from '../../../static/img/area-7/boat.png';
import flagImg from '../../../static/img/area-7/flag.png';
import number1 from '../../../static/img/area-7/number-1.png';
import number2 from '../../../static/img/area-7/number-2.png';
import number3 from '../../../static/img/area-7/number-3.png';
import number4 from '../../../static/img/area-7/number-4.png';
import number5 from '../../../static/img/area-7/number-5.png';

import { Animate } from './base-animate';

require('velocity-animate');
require('velocity-animate/velocity.ui');

const _ = {
  map,
};

const numberImgs = [number1, number2, number3, number4, number5];

function NumberJsx({ index, toStartAnimation }) {
  const baseHeight = 839;
  const topArr = [`${(697 / baseHeight) * 100}%`, `${(515 / baseHeight) * 100}%`, `${(466 / baseHeight) * 100}%`, `${(417 / baseHeight) * 100}%`, `${(368 / baseHeight) * 100}%`];
  const data = {
    className: cx(style.number, style[`number0${index + 1}`]),
    duration: 1000,
    delay: 500,
    animation: toStartAnimation ? { opacity: 1, top: topArr[index] } : { opacity: 0, top: '0%' },
    imgSrc: numberImgs[index],
    easing: toStartAnimation ? [500, 20] : undefined,
  };
  return (
    <Animate
      {...data}
    />
  );
}

NumberJsx.propTypes = {
  index: React.PropTypes.number.isRequired,
  toStartAnimation: React.PropTypes.bool,
};

NumberJsx.defaultProps = {
  toStartAnimation: false,
};

function NumbersJsx({ toStartAnimation }) {
  const jsx = [];
  for (let index = 0; index < numberImgs.length; index += 1) {
    jsx.push(<NumberJsx key={index} index={index} toStartAnimation={toStartAnimation} />);
  }
  return (
    <div className={style.number}>
      {jsx}
    </div>
  );
}

NumbersJsx.propTypes = {
  toStartAnimation: React.PropTypes.bool,
};

NumbersJsx.defaultProps = {
  toStartAnimation: false,
};

function getShipAnimationData(toStartAnimation) {
  const animation = toStartAnimation ? 'transition.bounceIn' : { opacity: 0 };
  return {
    animation,
    imgSrc: shipImg,
  };
}

function ShipsJsx({ toStartAnimation, onAnimationFinish }) {
  const shipMaximum = 8;
  let shipsPerRow = [shipMaximum, 4, 3, 2, 1];

  shipsPerRow = _.map(shipsPerRow, (num, colIndex) => {
    const jsx = [];
    for (let index = 0; index < num; index += 1) {
      jsx.push(
        <li key={index}>
          <Animate
            delay={300 * (index + 1)}
            {...getShipAnimationData(toStartAnimation)}
            onAnimationFinish={index === shipMaximum - 1 && toStartAnimation ?
              onAnimationFinish : undefined}
          />
        </li>,
      );
    }
    return (
      <ul key={colIndex}>
        {jsx}
      </ul>
    );
  });

  return (
    <div className={style.ships}>
      {shipsPerRow}
    </div>
  );
}

ShipsJsx.propTypes = {
  toStartAnimation: React.PropTypes.bool,
  onAnimationFinish: React.PropTypes.func,
};

ShipsJsx.defaultProps = {
  toStartAnimation: false,
  onAnimationFinish: undefined,
};

class Area extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toAnimateShip: false,
      toAnimateNumber: false,
    };
    this.onChange = this._onChange.bind(this);
    this.onShipAnimationFinish = this._onAnimationStart.bind(this, 'number');
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
        toAnimateShip: true,
      });
    }
  }

  _onAnimationStart(target) {
    switch (target) {
      case 'number':
        this.setState({
          toAnimateNumber: true,
        });
        break;
      default:

    }
  }

  render() {
    const { toAnimateShip, toAnimateNumber } = this.state;
    return (
      <div className={baseStyle.area}>
        <div className={baseStyle.container}>
          <img className={style.bg} src={bgImg} role="presentation" />
          <h2>
            <span className={baseStyle['seo-hidden']}>全球最大遠洋船隊</span>
            <img className={cx(style.title01, baseStyle['ab-center'])} src={title1} alt="全球最大遠洋船隊" />
          </h2>
          <h3>
            <span className={baseStyle['seo-hidden']}>漁船數居中西太平洋之冠</span>
            <img className={cx(style.title02, baseStyle['ab-center'])} src={title2} alt="漁船數居中西太平洋之冠" />
          </h3>
          <span className={baseStyle['seo-hidden']}>作業船數前五名</span>
          <img className={cx(style.title03, baseStyle['ab-center'])} src={title3} alt="作業船數前五名" />
          <VisibilitySensor
            onChange={this.onChange}
            active={!toAnimateShip}
            partialVisibility
            minTopValue={300}
          >
            <div
              className={baseStyle['animation-block']}
            >
              <img className={style.flags} src={flagImg} role="presentation" />
              <ShipsJsx
                toStartAnimation={toAnimateShip}
                onAnimationFinish={this.onShipAnimationFinish}
              />
              <NumbersJsx
                toStartAnimation={toAnimateNumber}
              />
            </div>
          </VisibilitySensor>
          <div className={cx(baseStyle['ab-center'], style.annotation)}>
            <span>註：中西太平洋是鮪魚最多的漁區 <br /> 資料來源：中西太平洋漁業委員會（WCPFC）統計（2016）</span>
          </div>
        </div>
      </div>
    );
  }

}
export default Area;
