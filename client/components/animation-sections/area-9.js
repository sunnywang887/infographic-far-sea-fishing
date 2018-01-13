/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

import 'velocity-animate'
import 'velocity-animate/velocity.ui'

import React, { Component, PropTypes } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import cx from 'classnames'
import { velocityHelpers } from 'velocity-react'
import baseStyle from './base.scss'
import style from './area-9.scss'
import { Animate, AnimateWithMask } from './base-animate'

// image
import bgImg from '../../../static/img/area-9/background.png'
import bigShip3d from '../../../static/img/area-9/3D/boat-0.png'
import title01 from '../../../static/img/area-9/title-1.png'
import title02 from '../../../static/img/area-9/title-2.png'
import ship013d from '../../../static/img/area-9/3D/boat-1.png'
import ship023d from '../../../static/img/area-9/3D/boat-2.png'
import ship033d from '../../../static/img/area-9/3D/boat-3.png'
import ship043d from '../../../static/img/area-9/3D/boat-4.png'
import net013d from '../../../static/img/area-9/3D/net-1.png'
import net023d from '../../../static/img/area-9/3D/net-2.png'
import net033d from '../../../static/img/area-9/3D/net-3.png'
import netMask013d from '../../../static/img/area-9/3D/net-1-mask.png'
import netMask023d from '../../../static/img/area-9/3D/net-2-mask.png'
import netMask033d from '../../../static/img/area-9/3D/net-3-mask.png'
import sea1 from '../../../static/img/area-9/3D/sea-1.png'
import sea2 from '../../../static/img/area-9/3D/sea-2.png'
import word from '../../../static/img/area-9/3D/word.png'
import circle2d from '../../../static/img/area-9/2D/cirle.png'
import ship012d from '../../../static/img/area-9/2D/boat-1.png'
import ship022d from '../../../static/img/area-9/2D/boat-2.png'
import net012d from '../../../static/img/area-9/2D/net-1.png'
import net022d from '../../../static/img/area-9/2D/net-2.png'
import netBg2d from '../../../static/img/area-9/2D/net-2-mask.png'
import fish2d from '../../../static/img/area-9/2D/fish.png'

function get2DNetAnimationData(toStartAnimation) {
  let animation

  if (toStartAnimation) {
    animation = {
      left: '0%',
    }
  }

  return {
    animation,
    className: style.net02,
    duration: 1000,
    easing: 'ease-in-out',
    imgSrc: net022d,
  }
}

function get2DCircleAnimationData(toStartAnimation) {
  const delay = 0
  const duration = 500
  const animation = toStartAnimation ? { opacity: 1 } : { opacity: 0 }

  return {
    animation,
    delay,
    duration,
    className: style.circle,
    imgSrc: circle2d,
  }
}


function get3DNet03AnimationData(toStartAnimation) {
  return {
    animation: {
      mask: toStartAnimation ? { opacity: 1, left: '0%' } : { opacity: 1, left: '-100%' },
      img: toStartAnimation ? { opacity: 1, left: '0%' } : { opacity: 1, left: '100%' },
    },
    bgImgSrc: netMask033d,
    delay: 0,
    duration: 800,
    imgSrc: net033d,
    style: {
      img: style['net03-3d'],
      mask: style.mask,
    },
  }
}

function get3DNet02AnimationData(toStartAnimation) {
  return {
    animation: {
      mask: toStartAnimation ? { opacity: 1, left: '0%' } : { opacity: 1, left: '100%' },
      img: toStartAnimation ? { opacity: 1, left: '0%' } : { opacity: 1, left: '-100%' },
    },
    bgImgSrc: netMask023d,
    delay: 0,
    duration: 1000,
    imgSrc: net023d,
    style: {
      img: style['net02-3d'],
      mask: style.mask,
    },
  }
}

function get3DNet01AnimationData(toStartAnimation) {
  return {
    animation: {
      mask: toStartAnimation ? { opacity: 1, top: '0%' } : { opacity: 1, top: '-100%' },
      img: toStartAnimation ? { opacity: 1, top: '0%' } : { opacity: 1, top: '100%' },
    },
    bgImgSrc: netMask013d,
    delay: 0,
    duration: 700,
    imgSrc: net013d,
    style: {
      img: style['net01-3d'],
      mask: style.mask,
    },
  }
}

class Ship2DJsx extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAnimated: false,
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.toStartAnimation !== this.props.toStartAnimation) {
      return true
    }
    return false
  }

  render() {
    const { isAnimated } = this.state
    const { toStartAnimation, onAnimationFinish } = this.props
    const animation = toStartAnimation && !isAnimated ? velocityHelpers.registerEffect({
      defaultDuration: 3000,
      calls: [
        [{
          left: '59%',
          top: '40%',
        }, 0.1],
        [{
          rotateZ: '0deg',
        }, 0.1],
        [{
          left: '0.35%',
        }, 0.333],
        [{
          rotateY: '180deg',
        }, 0.166],
        [{
          left: '55%',
        }, 0.333],
      ],
    }) : undefined

    const complete = () => {
      this.setState({
        isAnimated: true,
      })
      onAnimationFinish()
    }

    return (
      <Animate
        animation={animation}
        className={style.ship02}
        imgSrc={ship022d}
        easing="ease-in-out"
        onAnimationFinish={toStartAnimation ? complete : undefined}
      />
    )
  }
}

Ship2DJsx.propTypes = {
  onAnimationFinish: PropTypes.func,
  toStartAnimation: PropTypes.bool,
}

Ship2DJsx.defaultProps = {
  onAnimationFinish: undefined,
  toStartAnimation: false,
}

class Bubble extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toAnimate: false,
    }
  }

  componentDidMount() {
    const self = this
    function changeBubble() {
      setTimeout(() => {
        self.setState({
          toAnimate: !self.state.toAnimate,
        })
        changeBubble()
      }, 150)
    }
    changeBubble()
  }

  render() {
    const { className, toStartAnimation } = this.props
    const { toAnimate } = this.state
    return (
      <div className={className} style={{ display: toStartAnimation ? 'block' : 'none' }}>
        <img src={sea1} role="presentation" style={{ display: toAnimate ? 'block' : 'none' }} />
        <img src={sea2} role="presentation" style={{ display: toAnimate ? 'none' : 'block' }} />
      </div>
    )
  }
}

Bubble.propTypes = {
  className: PropTypes.string,
  toStartAnimation: PropTypes.bool,
}

Bubble.defaultProps = {
  className: '',
  toStartAnimation: false,
}

class Area extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toAnimateMove1: false,
      toAnimateMove2: false,
      toAnimateMove3: false,
      toAnimateMove4: false,
      toAnimateMove5: false,
      toAnimateMove6: false,
      toAnimateMove7: false,
    }
    this.onChange = this._onChange.bind(this)
    this.onMove1AnimationFinish = this._onAnimationStart.bind(this, 'Move2')
    this.onMove2AnimationFinish = this._onAnimationStart.bind(this, 'Move3')
    this.onMove3AnimationFinish = this._onAnimationStart.bind(this, 'Move4')
    this.onMove4AnimationFinish = this._onAnimationStart.bind(this, 'Move5')
    this.onMove5AnimationFinish = this._onAnimationStart.bind(this, 'Move6')
    this.onMove6AnimationFinish = this._onAnimationStart.bind(this, 'Move7')
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
        toAnimateMove1: true,
      })
    }
  }

  _onAnimationStart(target) {
    this.setState({
      [`toAnimate${target}`]: true,
    })
  }

  render() {
    const baseHeight = 589
    const baseWidth = 414

    const { toAnimateMove1, toAnimateMove2,
      toAnimateMove3, toAnimateMove4,
      toAnimateMove5, toAnimateMove6,
      toAnimateMove7,
    } = this.state

    const ship1Data = {
      animation: !toAnimateMove1 ? { left: `${(198 / baseWidth) * 100}%`, top: `${(255 / baseHeight) * 100}%`, opacity: 1 } : { left: `${(182 / baseWidth) * 100}%`, top: `${(277 / baseHeight) * 100}%` },
      className: style['ship01-3d'],
      imgSrc: ship013d,
    }

    if (toAnimateMove2) {
      ship1Data.animation.opacity = 0
      ship1Data.delay = 300
    }

    const ship2Data = {
      animation: toAnimateMove2 ? { opacity: 1 } : { opacity: 0 },
      className: style['ship02-3d'],
      imgSrc: ship023d,
      delay: 500,
    }

    if (toAnimateMove3) {
      ship2Data.animation.opacity = 0
      ship2Data.delay = 300
    }

    const ship3Data = {
      animation: toAnimateMove3 ? { opacity: 1 } : { opacity: 0 },
      className: style['ship03-3d'],
      imgSrc: ship033d,
      delay: 800,
    }

    if (toAnimateMove4) {
      ship3Data.animation.opacity = 0
      ship3Data.delay = 300
    }

    const ship4Data = {
      animation: toAnimateMove4 ? { opacity: 1 } : { opacity: 0 },
      className: style['ship04-3d'],
      imgSrc: ship043d,
      delay: 500,
    }

    return (
      <div className={baseStyle.area} style={{ backgroundColor: '#738498', marginTop: '-2px' }}>
        <div className={baseStyle.container}>
          <img className={style.bg} src={bgImg} role="presentation" />
          <h3>
            <span className={baseStyle['seo-hidden']}>兩種漁法，賺法不同</span>
            <img className={cx(style.title01, baseStyle['ab-center'])} src={title01} alt="兩種漁法，賺法不同" />
          </h3>
          <span className={baseStyle['seo-hidden']}>一艘圍網，一年進帳3億</span>
          <img className={cx(style.title02, baseStyle['ab-center'])} src={title02} alt="一艘圍網，一年進帳3億" />
          <VisibilitySensor
            onChange={this.onChange}
            active={!toAnimateMove1}
            partialVisibility
            minTopValue={300}
          >
            <div
              className={baseStyle['animation-block']}
            >
              <img className={style.bigship} src={bigShip3d} role="presentation" />
              <Bubble
                className={style.sea}
                toStartAnimation={toAnimateMove4}
              />
              {/* first move: move small ship to the sea from the big ship*/}
              <Animate
                {...ship1Data}
                onAnimationFinish={toAnimateMove1 ? this.onMove1AnimationFinish : undefined}
              />
              {/* second move: show the dotline01 and net01 */}
              <AnimateWithMask
                {...get3DNet01AnimationData(toAnimateMove2)}
                onAnimationFinish={toAnimateMove2 ? this.onMove2AnimationFinish : undefined}
              />
              <Animate
                {...ship2Data}
              />
              {/* third move: show the dotline02 and net02*/}
              <AnimateWithMask
                {...get3DNet02AnimationData(toAnimateMove3)}
                onAnimationFinish={toAnimateMove3 ? this.onMove3AnimationFinish : undefined}
              />
              <Animate
                {...ship3Data}
              />
              {/* fourth move: show the dotline03 and net03 */}
              <AnimateWithMask
                {...get3DNet03AnimationData(toAnimateMove4)}
                onAnimationFinish={toAnimateMove4 ? this.onMove4AnimationFinish : undefined}
              />
              <Animate
                {...ship4Data}
              />
              {/* 5th move: show the circle */}
              <Animate
                {...get2DCircleAnimationData(toAnimateMove5)}
                onAnimationFinish={toAnimateMove5 ? this.onMove5AnimationFinish : undefined}
              >
                <img className={style.ship01} src={ship012d} role="presentation" />
                <img className={style.fish} src={fish2d} role="presentation" />
                {/* 6th move: move the small ship onto the sea */}
                <Ship2DJsx
                  toStartAnimation={toAnimateMove6}
                  onAnimationFinish={toAnimateMove6 ? this.onMove6AnimationFinish : undefined}
                />
                <div className={style.netBg}>
                  <img src={netBg2d} role="presentation" />
                  <img className={style.net01} src={net012d} role="presentation" />
                  {/* 6th move: move the small ship and net*/}
                  <Animate
                    {...get2DNetAnimationData(toAnimateMove6)}
                    delay={500}
                    onAnimationFinish={toAnimateMove6 ? this.onMove6AnimationFinish : undefined}
                  />
                </div>
              </Animate>
              {/* 7th move: show the word*/}
              <Animate
                imgSrc={word}
                animation={toAnimateMove7 ? { opacity: 1 } : { opacity: 0 }}
                className={style.word}
                delay={1000}
                duration={500}
              />
            </div>
          </VisibilitySensor>
        </div>
      </div>
    )
  }

}
export default Area
