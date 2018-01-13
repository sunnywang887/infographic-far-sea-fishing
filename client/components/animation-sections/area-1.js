/* eslint  no-underscore-dangle: ["error", { "allowAfterThis": true }]*/

import 'velocity-animate'
import 'velocity-animate/velocity.ui'

import React, { Component, PropTypes } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
// lodash
import map from 'lodash/map'
import cx from 'classnames'
import { VelocityComponent, velocityHelpers } from 'velocity-react'
import baseStyle from './base.scss'
import style from './area-1.scss'

// image
import bgImg from '../../../static/img/area-1/background.png'
import plateImg from '../../../static/img/area-1/plate.png'
import sashimi01 from '../../../static/img/area-1/sashimi-1.png'
import sashimiMask01 from '../../../static/img/area-1/sashimi-mask-1.png'
import sashimi02 from '../../../static/img/area-1/sashimi-2.png'
import sashimiMask02 from '../../../static/img/area-1/sashimi-mask-2.png'
import sashimi03 from '../../../static/img/area-1/sashimi-3.png'
import sashimiMask03 from '../../../static/img/area-1/sashimi-mask-3.png'
import sashimi04 from '../../../static/img/area-1/sashimi-4.png'
import sashimiMask04 from '../../../static/img/area-1/sashimi-mask-4.png'
import sashimi05 from '../../../static/img/area-1/sashimi-5.png'
import sashimiMask05 from '../../../static/img/area-1/sashimi-mask-5.png'
import text01 from '../../../static/img/area-1/sashimi-word-1.png'
import text02 from '../../../static/img/area-1/sashimi-word-2.png'
import text03 from '../../../static/img/area-1/sashimi-word-3.png'
import text04 from '../../../static/img/area-1/sashimi-word-4.png'
import text05 from '../../../static/img/area-1/sashimi-word-5.png'
import title01 from '../../../static/img/area-1/title-1.png'
import title02 from '../../../static/img/area-1/title-2.png'
import title03 from '../../../static/img/area-1/title-3.png'

const _ = {
  map,
}

function SashimiTextJsx({ children, duration, delay, toStartAnimation }) {
  return (
    <VelocityComponent
      animation={toStartAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      duration={duration}
      delay={delay}
    >
      { React.Children.only(children) }
    </VelocityComponent>
  )
}

SashimiTextJsx.propTypes = {
  children: PropTypes.element,
  duration: PropTypes.number,
  delay: PropTypes.number,
  toStartAnimation: PropTypes.bool,
}

SashimiTextJsx.defaultProps = {
  children: null,
  duration: 500,
  delay: 500,
  toStartAnimation: false,
}

class SashimiJsx extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAnimated: this.props.toStartAnimation,
    }
    this.onAnimationFinish = this._onAnimationFinish.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isAnimated: nextProps.toStartAnimation,
    })
  }

  _onAnimationFinish() {
    this.setState({
      isAnimated: false,
    })
  }

  render() {
    const { delay, duration, index, sashimiImg, sashimiMaskImg } = this.props
    const animation = this.state.isAnimated ?
      velocityHelpers.registerEffect({
        defaultDuration: 1500,
        calls: [
          [{
            rotateZ: [180, 'ease'],
          }, 1],
          [{
            opacity: 0,
          }, 0.1],
        ],
      }) : { rotateZ: 0 }

    return (
      <div className={style.sashimi}>
        <img className={style[`pie0${index}`]} src={sashimiImg} role="presentation" />
        <VelocityComponent
          animation={animation}
          duration={duration}
          delay={delay}
          complete={this.state.isAnimated ? this.onAnimationFinish : undefined}
        >
          <img className={style[`mask0${index}`]} src={sashimiMaskImg} role="presentation" />
        </VelocityComponent>
      </div>
    )
  }
}

SashimiJsx.propTypes = {
  delay: PropTypes.number,
  duration: PropTypes.number,
  index: PropTypes.number,
  toStartAnimation: PropTypes.bool,
  sashimiImg: PropTypes.string.isRequired,
  sashimiMaskImg: PropTypes.string.isRequired,
}

SashimiJsx.defaultProps = {
  delay: 500,
  duration: 500,
  index: 1,
  toStartAnimation: false,
  sashimiImg: PropTypes.string.isRequired,
  sashimiMaskImg: PropTypes.string.isRequired,
}

class Area extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toStartAnimation: false,
    }
    this.onChange = this._onChange.bind(this)
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
        toStartAnimation: true,
      })
    }
  }

  render() {
    const toStartAnimation = this.state.toStartAnimation
    let textObjs = [text01, text02, text03, text04, text05]
    textObjs = _.map(textObjs, (textObj, index) => (
      <SashimiTextJsx
        duration={300}
        delay={index === 0 ? 1000 : index * 1600}
        toStartAnimation={toStartAnimation}
        key={index}
      >
        <img className={style[`text0${index + 1}`]} src={textObj} role="presentation" />
      </SashimiTextJsx>
      ))

    let pieObjs = [
      [sashimi01, sashimiMask01],
      [sashimi02, sashimiMask02],
      [sashimi03, sashimiMask03],
      [sashimi04, sashimiMask04],
      [sashimi05, sashimiMask05],
    ]

    pieObjs = _.map(pieObjs, (pieArr, index) => (
      <SashimiJsx
        duration={1500}
        delay={(index) * 1500}
        toStartAnimation={toStartAnimation}
        sashimiImg={pieArr[0]}
        sashimiMaskImg={pieArr[1]}
        index={index + 1}
        key={index}
      />
      ))

    return (
      <div className={baseStyle.area} style={{ backgroundColor: '#EDEBEB' }}>
        <div className={baseStyle.container}>
          <img className={style.bg} src={bgImg} role="presentation" />
          <h2>
            <span className={baseStyle['seo-hidden']}>台灣，生猛的捕撈大國</span>
            <img className={cx(style.title01, baseStyle['ab-center'])} src={title01} alt="台灣，生猛的捕撈大國" />
          </h2>
          <h3>
            <span className={baseStyle['seo-hidden']}>日本生魚片，台灣供一半</span>
            <img className={cx(style.title02, baseStyle['ab-center'])} src={title02} alt="日本生魚片，台灣供一半" />
          </h3>
          <span className={baseStyle['seo-hidden']}>日本的大目鮪進口國</span>
          <img className={cx(style.title03, baseStyle['ab-center'])} src={title03} alt="日本的大目鮪進口國" />
          <div className={cx(style.title04, baseStyle.text, baseStyle['ab-center'])}>
            <p>日本是全球最大鮪魚生魚片進口國，每10盤就有5盤從台灣來。</p>
          </div>
          <div className={baseStyle['animation-block']}>
            <VisibilitySensor
              onChange={this.onChange}
              active={!toStartAnimation}
              partialVisibility
              minTopValue={300}
            >
              <div className={style.plate} >
                <img src={plateImg} role="presentation" />
                { pieObjs }
                <div className={style['text-block']}>
                  { textObjs }
                </div>
              </div>
            </VisibilitySensor>
          </div>
          <div className={cx(baseStyle['ab-center'], style.annotation)} >
            <p>資料來源：對外漁協《鮪延繩釣漁獲統計年報2012-2014》（以主要魚種大目鮪計算）
            </p>
          </div>
        </div>
      </div>
    )
  }

}
export default Area
