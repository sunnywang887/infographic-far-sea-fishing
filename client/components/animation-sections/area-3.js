/* eslint  no-underscore-dangle: ["error", { "allowAfterThis": true }]*/

import React, { Component, PropTypes } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import cx from 'classnames'
import baseStyle from './base.scss'
import style from './area-3.scss'
import { Animate, AnimateWithMask } from './base-animate'

// image
import bgImg from '../../../static/img/area-3/background.png'
import shipImg from '../../../static/img/area-3/boat.png'
import fishImg from '../../../static/img/area-3/fish.png'
import ropeImg from '../../../static/img/area-3/net-rope.png'
import ropeBgImg from '../../../static/img/area-3/net-rope-mask.png'
import flag1 from '../../../static/img/area-3/flag-1.png'
import flag2 from '../../../static/img/area-3/flag-2.png'
import flag3 from '../../../static/img/area-3/flag-3.png'
import flag4 from '../../../static/img/area-3/flag-4.png'
import number1 from '../../../static/img/area-3/number-1.png'
import number2 from '../../../static/img/area-3/number-2.png'
import number3 from '../../../static/img/area-3/number-3.png'
import number4 from '../../../static/img/area-3/number-4.png'
import title01 from '../../../static/img/area-3/title-1.png'
import title02 from '../../../static/img/area-3/title-2.png'
import sea01Img from '../../../static/img/area-3/sea-w414.png'
import sea02Img from '../../../static/img/area-3/sea-w5000.png'

const flag = [flag1, flag2, flag3, flag4]
const number = [number1, number2, number3, number4]

class FishJsx extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animation: {
        opacity: 0,
      },
      isAnimationStarted: false,
      isAnimationFinished: false,
    }
    this.animationComplete = this._animationComplete.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.toStartAnimation) {
      this.setState({
        animation: {
          opacity: 1,
        },
        isAnimationStarted: true,
      })
    }
  }

  _animationComplete() {
    if (!this.state.isAnimationStarted) {
      return
    }
    const { index } = this.props
    const scaleArr = [2.95, 2.05, 1.45, 1.45]
    const topArr = ['60%', '56.5%', '54.3%', '54.3%']
    const leftArr = ['5.5%', '30.4%', '53.3%', '76.4%']

    const animation = {
      opacity: 1,
      top: topArr[index - 1],
      left: leftArr[index - 1],
      scale: scaleArr[index - 1],
    }

    this.setState({
      animation,
      isAnimationFinished: true,
    })
  }

  render() {
    const { index } = this.props
    const { animation, isAnimationFinished } = this.state
    const duration = 1000
    const delay = 0

    const data = {
      className: cx(style.fish, style[`fish0${index}`]),
      duration,
      delay,
      animation,
      imgSrc: fishImg,
      onAnimationFinish: isAnimationFinished ?
        this.props.onAnimationFinish : this.animationComplete,
    }

    return (
      <Animate
        {...data}
      />
    )
  }
}

FishJsx.propTypes = {
  index: PropTypes.number.isRequired,
  onAnimationFinish: PropTypes.func,
  toStartAnimation: PropTypes.bool,
}

FishJsx.defaultProps = {
  onAnimationFinish: undefined,
  toStartAnimation: false,
}

function getNumberAnimationData(index, toStartAnimation) {
  const topArr = ['78.5%', '71.1%', '66%', '66%']
  return {
    className: cx(style.number, style[`number0${index}`]),
    duration: 500,
    delay: 0,
    animation: toStartAnimation ? { opacity: 1, top: topArr[index - 1] } : { opacity: 0, top: '0%' },
    imgSrc: number[index - 1],
    easing: toStartAnimation ? [500, 20] : undefined,
  }
}

function getRopeAnimationData(index, toStartAnimation) {
  return {
    duration: 500,
    delay: 0,
    animation: {
      mask: toStartAnimation ? { opacity: 1, top: '0%' } : { opacity: 1, top: '-100%' },
      img: toStartAnimation ? { opacity: 1, top: '0%' } : { opacity: 1, top: '100%' },
    },
    bgImgSrc: ropeBgImg,
    imgSrc: ropeImg,
    style: {
      img: cx(style.rope, style[`rope0${index}`]),
      mask: style.mask,
    },
  }
}

function getFlagAnimationData(index, toStartAnimation) {
  return {
    className: cx(style.flag, style[`flag0${index}`]),
    duration: 500,
    delay: 0,
    animation: toStartAnimation ? { opacity: 1 } : { opacity: 0 },
    imgSrc: flag[index - 1],
  }
}

function getShipAnimationData(index, toStartAnimation) {
  const offsetArr = ['8%', '33%', '56%', '79%']
  return {
    className: cx(style.ship, style[`ship0${index}`]),
    duration: 1500,
    delay: 0,
    animation: toStartAnimation ? { left: offsetArr[index - 1] } : undefined,
    imgSrc: shipImg,
  }
}

class Area extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toAnimateShip: false,
      toAnimateFlag: false,
      toAnimateRope: false,
      toAnimateFish: false,
      toAnimateNumber: false,
    }
    this.onChange = this._onChange.bind(this)
    this.onShipAnimationFinish = this._onAnimationStart.bind(this, 'flag')
    this.onFlagAnimationFinish = this._onAnimationStart.bind(this, 'rope')
    this.onRopeAnimationFinish = this._onAnimationStart.bind(this, 'fish')
    this.onFishAnimationFinish = this._onAnimationStart.bind(this, 'number')
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  _onChange(isVisible) {
    if (isVisible && this._isMounted) {
      this.setState({
        toAnimateShip: true,
      })
    }
  }

  _onAnimationStart(target) {
    switch (target) {
      case 'flag':
        this.setState({
          toAnimateFlag: true,
        })
        break
      case 'rope':
        this.setState({
          toAnimateRope: true,
        })
        break
      case 'fish':
        this.setState({
          toAnimateFish: true,
        })
        break
      case 'number':
        this.setState({
          toAnimateNumber: true,
        })
        break
      default:

    }
  }

  render() {
    const { toAnimateShip, toAnimateFlag,
      toAnimateRope, toAnimateFish, toAnimateNumber } = this.state
    const animationNumber = 4

    const shipsJsx = []
    const flagsJsx = []
    const ropesJsx = []
    const fishsJsx = []
    const numbersJsx = []

    for (let index = 1; index <= animationNumber; index += 1) {
      shipsJsx.push(
        <Animate
          key={index}
          {...getShipAnimationData(index, toAnimateShip)}
          onAnimationFinish={toAnimateShip ? this.onShipAnimationFinish : undefined}
        />,
      )

      flagsJsx.push(
        <Animate
          {...getFlagAnimationData(index, toAnimateFlag)}
          key={index}
          onAnimationFinish={index === 4 && toAnimateFlag ? this.onFlagAnimationFinish : undefined}
        />,
      )

      ropesJsx.push(
        <AnimateWithMask
          {...getRopeAnimationData(index, toAnimateRope)}
          key={index}
          onAnimationFinish={index === 4 && toAnimateRope ? this.onRopeAnimationFinish : undefined}
        />,
      )

      fishsJsx.push(
        <FishJsx
          toStartAnimation={toAnimateFish}
          index={index}
          key={index}
          onAnimationFinish={index === 4 && toAnimateFish ? this.onFishAnimationFinish : undefined}
        />,
      )

      numbersJsx.push(
        <Animate
          {...getNumberAnimationData(index, toAnimateNumber)}
          key={index}
        />,
      )
    }

    return (
      <VisibilitySensor
        onChange={this.onChange}
        active={!toAnimateShip}
        partialVisibility
        minTopValue={200}
      >
        <div className={baseStyle.area}>
          <div className={baseStyle.container}>
            <img className={style.bg} src={bgImg} role="presentation" />
            <h3>
              <span className={baseStyle['seo-hidden']}>釣走全球主要漁場三分之一的鮪魚</span>
              <img className={cx(style.title01, baseStyle['ab-center'])} src={title01} alt="釣走全球主要漁場三分之一的鮪魚" />
            </h3>
            <p>
              <span className={baseStyle['seo-hidden']}>前四大魚獲國比一比</span>
              <img className={cx(style.title02, baseStyle['ab-center'])} src={title02} alt="前四大魚獲國比一比" />
            </p>
            <div
              className={baseStyle['animation-block']}
            >
              { shipsJsx }
              { flagsJsx }
              { ropesJsx }
              { fishsJsx }
              { numbersJsx }
            </div>
            <div className={baseStyle.sea} >
              <img className={baseStyle.mobile} src={sea01Img} role="presentation" />
              <img className={baseStyle['non-mobile']} src={sea02Img} role="presentation" />
            </div>
            <div className={cx(baseStyle['ab-center'], style.annotation)}>
              <span>資料來源：對外漁協《鮪延繩釣漁獲統計年報2012-2014（統計漁場包括中西太平洋、印度洋、大西洋，漁法為延繩釣）</span>
            </div>
          </div>
        </div>
      </VisibilitySensor>
    )
  }

}
export default Area
