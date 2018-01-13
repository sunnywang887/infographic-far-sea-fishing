/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

import cx from 'classnames'
import React from 'react'

// css
import baseStyle from './base.scss'
import style from './area-12.scss'

// image
import boat from '../../../static/img/area-12/boat.png'
import fish from '../../../static/img/area-12/fish.png'
import sea1 from '../../../static/img/area-12/sea-w414.png'
import sea2 from '../../../static/img/area-12/sea-w5000.png'

function Area(props) {
  return (
    <div className={baseStyle.area} style={{ backgroundColor: '#E5E2E2' }}>
      <div className={cx(baseStyle.container, style.bg)}>
        <p className={cx(baseStyle.text, baseStyle['ab-center'], style.text)}>
          被發黃牌後，台灣今年（2016）年7月修改並通過《遠洋漁業三法》，明年1月20日上路。<br /><br />
          新規定管更多也罰更重，違規罰鍰為150萬元到4500萬元不等。這考驗漁業署的執行力與執法決心。<br /><br />
          然而這只是台灣遠洋漁業困境的冰山一角。面對消費者對生態永續的要求，台灣的挑戰，才正要開始。
        </p>
        <a
          href="//www.twreporter.org/topics/far-sea-fishing-investigative-report"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={style.list}>
            <img className={style.fish} src={fish} role="presentation" />
            <span>年度調查專題：造假．剝削．血淚漁場</span>
          </div>
        </a>
        <div className={cx(baseStyle.sea)} style={{ zIndex: 1 }} >
          <img className={style.boat} src={boat} role="presentation" />
          <img className={baseStyle.mobile} src={sea1} role="presentation" />
          <img className={baseStyle['non-mobile']} src={sea2} role="presentation" />
        </div>
      </div>
    </div>
  )
}
export default Area
