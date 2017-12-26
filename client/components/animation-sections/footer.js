/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

import cx from 'classnames';
import React from 'react';
import { FacebookButton, TwitterButton } from 'react-social';

// css
import baseStyle from './base.scss';
import style from './footer.scss';

// image
import donate from '../../../static/img/footer/icon-donation.png';
import logo from '../../../static/img/footer/logo.png';
import cc from '../../../static/img/footer/icon-cc.png';
import github from '../../../static/img/footer/icon-github.png';
import fb from '../../../static/img/footer/icon-share-fb.svg';
import twitter from '../../../static/img/footer/icon-share-twitter.svg';

// CONSTANTS
import CONSTANTS from './constants';

function Area(props) {
  return (
    <div className={baseStyle.area} style={{ backgroundColor: '#738498', marginTop: '-2px' }}>
      <div className={cx(baseStyle.container, style.bg)}>
        <div className={cx(style.share, baseStyle.text, style.text)}>
          <span>分享文章｜</span>
          <FacebookButton url={CONSTANTS.canonicalPath} appId={CONSTANTS.appId}>
            <img src={fb} role="presentation" style={{ marginLeft: 8 }} />
          </FacebookButton>
          <TwitterButton message="台灣遠洋漁業的大鮪鱸鰻" url={CONSTANTS.canonicalPath}>
            <img src={twitter} role="presentation" style={{ marginLeft: 18 }} />
          </TwitterButton>
        </div>
        <div className={cx(baseStyle.text, style.text, baseStyle['ab-center'])}>
          <div>數據、文字整理 ｜ 鄭涵文、陳貞樺</div>
          <div>設計 ｜ 黃禹禛</div>
          <div>工程 ｜ 李法賢</div>
          <div>監製 ｜ 李雪莉</div>
        </div>
        <a href="https://www.twreporter.org/donation/period" target="_blank" rel="noopener noreferrer">
          <img className={cx(style.donate, baseStyle['ab-center'])} src={donate} alt="贊助我們" />
        </a>
        <a href="https://twreporter.org/" target="_blank" rel="noopener noreferrer">
          <img className={cx(style.logo)} src={logo} alt="報導者 The Reporter" />
        </a>
        <a href="https://github.com/twreporter" target="_blank" rel="noopener noreferrer">
          <div className={cx(style.github)}>
            <img src={github} alt="https://github.com/twreporter" />
            <span>github.com/twreporter.org</span>
          </div>
        </a>
        <div className={cx(style.cc)}>
          <img src={cc} alt="除另有註明，網站內容皆採用創用 CC 姓名標示-非商業性-禁止改作授權條款" />
          <span>除另有註明，網站內容皆採用創用 CC 姓名標示-非商業性-禁止改作授權條款</span>
        </div>
      </div>
    </div>
  );
}
export default Area;
