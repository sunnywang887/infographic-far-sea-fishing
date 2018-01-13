/* eslint  no-underscore-dangle: ["error", { "allowAfterThis": true }]*/

import VisibilitySensor from 'react-visibility-sensor'
import cx from 'classnames'
import React, { Component } from 'react'
import { Animate } from './base-animate'

// css
import baseStyle from './base.scss'
import style from './area-8.scss'

// image
import bgImg from '../../../static/img/area-8/background.png'
import boatImg from '../../../static/img/area-8/boat.png'
import focImg from '../../../static/img/area-8/foc.png'
import titleImg from '../../../static/img/area-8/title.png'
import sea01Img from '../../../static/img/area-8/sea-w414.png'
import sea02Img from '../../../static/img/area-8/sea-w5000.png'

class Area extends Component {

  constructor(props) {
    super(props)
    this.state = {
      toAnimateFOC: false,
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
        toAnimateFOC: true,
      })
    }
  }

  render() {
    const { toAnimateFOC } = this.state
    return (
      <VisibilitySensor
        onChange={this.onChange}
        active={!toAnimateFOC}
        partialVisibility
        minTopValue={300}
      >
        <div className={cx(baseStyle.area, style.area)}>
          <div className={baseStyle.container}>
            <img className={style.bg} src={bgImg} role="presentation" />
            <div
              className={baseStyle['animation-block']}
            >
              <div className={baseStyle.sea} style={{ zIndex: 1 }} >
                <img className={baseStyle.mobile} src={sea01Img} role="presentation" />
                <img className={baseStyle['non-mobile']} src={sea02Img} role="presentation" />
              </div>
              <p className={cx(baseStyle.text, style.text)}>
                海上其實還有一批掛著別國國旗，實際上卻是台灣人經營的船隊。
                一來台灣限建新船，二來可規避政府管理，這種「披著他國船殼的台灣船」，
                目前向漁業署登記的有247艘。但業界人士推估，船數遠超過此數。
              </p>
              <p className={cx(baseStyle.annotation, baseStyle['ab-center'], style.annotation)}>
                資料來源：漁業署
              </p>
              <img className={cx(style.title, baseStyle['ab-center'])} src={titleImg} alt="神秘的遠洋隱形船隊" />
              <img className={cx(style.boat, baseStyle['ab-center'])} src={boatImg} role="presentation" />
              <Animate
                animation={toAnimateFOC ? { opacity: 1 } : { opacity: 0 }}
                className={cx(style.foc, baseStyle['ab-center'])}
                imgSrc={focImg}
                duration={1000}
                delay={500}
              />
            </div>
          </div>
        </div>
      </VisibilitySensor>
    )
  }

}
export default Area
