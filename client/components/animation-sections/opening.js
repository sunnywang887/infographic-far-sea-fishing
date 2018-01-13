/* eslint  no-underscore-dangle: ["error", { "allowAfterThis": true }]*/

import React, { Component } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import cx from 'classnames'
import { VelocityComponent } from 'velocity-react'
import baseStyle from './base.scss'
import style from './opening.scss'
import { Animate } from './base-animate'
// image
import bgImg from '../../../static/img/opening/background.png'
import titleImg from '../../../static/img/opening/title.png'
import boat01Img from '../../../static/img/opening/boat-1.png'
import boat02Img from '../../../static/img/opening/boat-2.png'
import sunImg from '../../../static/img/opening/sun.png'
import fish01Img from '../../../static/img/opening/tuna-1.png'
import fish02Img from '../../../static/img/opening/tuna-2.png'
import sea01Img from '../../../static/img/opening/sea-w414.png'
import sea02Img from '../../../static/img/opening/sea-w5000.png'
import logoImg from '../../../static/img/opening/logo.svg'

class Area extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toAnimateBoat: false,
      toAnimateFishFadeIn: false,
      toAnimateFishJump: false,
      toAnimateText: false,
    }
    this.onChange = this._onChange.bind(this)
    this.onBoatAnimationFinish = this._onAnimationStart.bind(this, 'FishFadeIn')
    this.onFishFadeInAnimationFinish = this._onAnimationStart.bind(this, 'Text')
  }

  componentDidMount() {
    const self = this
    function changeJumpState() {
      setTimeout(() => {
        self.setState({
          toAnimateFishJump: !self.state.toAnimateFishJump,
        })
        changeJumpState()
      }, 100)
    }
    changeJumpState()
  }

  _onChange(isVisible) {
    if (isVisible) {
      this._timeout = setTimeout(() => {
        this.setState({
          toAnimateBoat: true,
        })
        clearTimeout(this._timeout)
      }, 1500)
    }
  }

  _onAnimationStart(target) {
    this.setState({
      [`toAnimate${target}`]: true,
    })
  }

  render() {
    const { toAnimateBoat, toAnimateFishFadeIn, toAnimateFishJump, toAnimateText } = this.state
    const baseHeight = 643
    const baseWidth = 414

    return (
      <VisibilitySensor
        onChange={this.onChange}
        active={!toAnimateBoat}
        partialVisibility
      >
        <div className={style.area}>
          <div className={baseStyle.container}>
            <img className={style.bg} src={bgImg} role="presentation" />
            <div
              className={baseStyle['animation-block']}
            >
              <h1>
                <span className={baseStyle['seo-hidden']}>台灣遠洋漁業的大鮪鱸鰻</span>
                <Animate
                  animation={toAnimateBoat ? { top: `${(20 / baseHeight) * 100}%` } : { top: '-50%' }}
                  imgSrc={titleImg}
                  imgAlt={'台灣遠洋漁業的大鮪鱸鰻'}
                  className={style.title}
                  duration={500}
                  easing={[500, 20]}
                />
              </h1>
              <a href="https://twreporter.org/" target="_blank" rel="noopener noreferrer"><img src={logoImg} className={style.logo} role="presentation" /></a>
              <Animate
                animation={toAnimateBoat ? { opacity: 1 } : { opacity: 0 }}
                imgSrc={sunImg}
                className={style.sun}
                duration={1000}
              />
              <div className={baseStyle.sea} style={{ zIndex: 1 }} >
                <img className={baseStyle.mobile} src={sea01Img} role="presentation" />
                <img className={baseStyle['non-mobile']} src={sea02Img} role="presentation" />
              </div>
              <VelocityComponent
                animation={toAnimateText ? { opacity: 1 } : { opacity: 0 }}
                duration={500}
              >
                <div className={cx(style.text)}>
                  <p>只佔全球人口0.36%的台灣，卻擁有最多遠洋漁船，還是鮪魚最重要漁場的撈捕冠軍，
                    堪稱遠洋大「鮪」鱸鰻。這支為台灣帶進數百億年產值的撈捕船隊，有多大尾？
                    讓我們從數字一探究竟。
                  </p>
                </div>
              </VelocityComponent>
              <Animate
                animation={toAnimateBoat ? { left: '5%' } : { left: '-100%' }}
                imgSrc={boat01Img}
                className={style.boat01}
                delay={500}
                duration={500}
                onAnimationFinish={toAnimateBoat ? this.onBoatAnimationFinish : undefined}
              />
              <Animate
                animation={toAnimateBoat ? { left: '62.3%' } : { left: '110%' }}
                imgSrc={boat02Img}
                className={style.boat02}
                delay={500}
                duration={500}
              />
              <VelocityComponent
                animation={toAnimateFishFadeIn ? { top: `${(246 / baseHeight) * 100}%`, left: `${(79 / baseWidth) * 100}%` } : undefined}
                duration={800}
                complete={toAnimateFishFadeIn ? this.onFishFadeInAnimationFinish : undefined}
              >
                <div className={style.fish}>
                  <img src={fish01Img} style={{ display: toAnimateFishJump ? 'block' : 'none' }} role="presentation" />
                  <img src={fish02Img} style={{ display: toAnimateFishJump ? 'none' : 'block' }} role="presentation" />
                </div>
              </VelocityComponent>
            </div>
          </div>
        </div>
      </VisibilitySensor>
    )
  }
}

export default Area
