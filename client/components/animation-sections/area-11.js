/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint no-unused-vars: ["error", { "args": "none" }] */

import cx from 'classnames';
import React from 'react';

// css
import baseStyle from './base.scss';
import style from './area-11.scss';

// image
import title1 from '../../../static/img/area-11/title-1.png';
import title2 from '../../../static/img/area-11/title-2.png';
import title3 from '../../../static/img/area-11/title-3.png';
import title4 from '../../../static/img/area-11/title-4.png';
import map from '../../../static/img/area-11/map.png';

function Area(props) {
  return (
    <div className={baseStyle.area}>
      <div className={cx(baseStyle.container, style.bg)}>
        <h2>
          <span className={baseStyle['seo-hidden']}>被世界盯上的台灣</span>
          <img className={cx(style.title01, baseStyle['ab-center'])} src={title1} alt="被世界盯上的台灣" />
        </h2>
        <h3>
          <span className={baseStyle['seo-hidden']}>船沒管好，別來我家賣魚</span>
          <img className={cx(style.title02, baseStyle['ab-center'])} src={title2} alt="船沒管好，別來我家賣魚" />
        </h3>
        <p className={cx(baseStyle.text, baseStyle['ab-center'], style.text)}>
          近年台灣常因各種海上違規，而被其他國家盯上。<br /><br />
          黃牌：前三大水產市場歐盟，指責台灣經常非法漁撈（IUU），違規捕魚，甚至質疑台灣漁政單位執法不力。<br /><br />
          經過3年觀察，歐盟結論是：不只管不好，還罰太少，是不負責任的漁業國家，2015年10月發黃牌警告！
        </p>
        <p className={baseStyle['seo-hidden']}>被歐盟舉黃牌的11國</p>
        <img className={cx(style.title03, baseStyle['ab-center'])} src={title3} alt="被歐盟舉黃牌的11國" />
        <p className={baseStyle['seo-hidden']}>
          黃牌：古拉索、聖克里斯多福及尼維斯、聖文森及格瑞那丁、千里達及托巴哥、獅子山、葛摩、泰國、台灣、索羅門群島、吉斯巴斯、吐瓦魯。紅牌：幾內亞、柬埔寨。
        </p>
        <img
          className={style.map}
          src={map}
          alt="黃牌：庫拉索、聖克里斯多福及尼維斯、聖文森及格瑞那丁、千里達及托巴哥、獅子山、葛摩、泰國、台灣、索羅門群島、吉斯巴斯、吐瓦魯。紅牌：幾內亞、柬埔寨。"
        />
        <p className={baseStyle['seo-hidden']}>據估計，台灣若被發紅牌，相關產業損失將超過76億元</p>
        <img className={cx(style.title04, baseStyle['ab-center'])} src={title4} alt="據估計，台灣若被發紅牌，相關產業損失將超過76億元" />
        <p className={cx(baseStyle.annotation, baseStyle['ab-center'], style.annotation)}>
          資料來源：漁業署
        </p>
      </div>
    </div>
  );
}
export default Area;
