/* eslint  no-underscore-dangle: ["error", { "allowAfterThis": true }]*/

import CountUp from 'react-countup';
import React, { Component, PropTypes } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import cx from 'classnames';
import baseStyle from './base.scss';
import style from './area-4-6.scss';
import { Animate } from './base-animate';

// image
import bg01 from '../../../static/img/area-4/background.png';
import bg02 from '../../../static/img/area-5/background.png';
import bg03 from '../../../static/img/area-6/background.png';
import title01 from '../../../static/img/area-4/title-1.png';
import title02 from '../../../static/img/area-4/title-2.png';
import fish01 from '../../../static/img/area-4/fish.png';
import fish02 from '../../../static/img/area-5/fish.png';
import fish03 from '../../../static/img/area-6/fish.png';
import name01 from '../../../static/img/area-4/name.png';
import name02 from '../../../static/img/area-5/name.png';
import name03 from '../../../static/img/area-6/name.png';
import note01 from '../../../static/img/area-4/note.png';
import note02 from '../../../static/img/area-5/note.png';
import note03 from '../../../static/img/area-6/note.png';
import ranking01 from '../../../static/img/area-4/ranking.png';
import ranking02 from '../../../static/img/area-5/ranking.png';
import ranking03 from '../../../static/img/area-6/ranking.png';

const bgImgArr = [bg01, bg02, bg03];
const fishImgArr = [fish01, fish02, fish03];
const nameImgArr = [name01, name02, name03];
const noteImgArr = [note01, note02, note03];
const rankingImgArr = [ranking01, ranking02, ranking03];
const numberArr = [4019725, 1066656000, 1522710000];

function getRankingAnimationData(toStartAnimation) {
  let animation = {
    opacity: 0,
    left: '100%',
    top: '100%',
    scale: 10,
  };

  if (toStartAnimation) {
    animation = {
      opacity: 1,
      left: '3%',
      top: '3%',
      scale: 1,
    };
  }

  return {
    animation,
  };
}

function getNoteAnimationData(toStartAnimation) {
  let animation = {
    opacity: 0,
  };

  if (toStartAnimation) {
    animation = {
      opacity: 1,
    };
  }

  return {
    animation,
  };
}

class NumberJsx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimated: false,
    };
    this.onAnimationFinish = this._onAnimationFinish.bind(this);
  }

  _onAnimationFinish() {
    this.setState({
      isAnimated: true,
    });
    this.props.onAnimationFinish();
  }

  render() {
    if (!this.props.toStartAnimation) {
      return null;
    }
    return (
      <div className={style[`number0${this.props.index + 1}`]}>
        <CountUp
          className={style.presentation}
          start={this.props.startNum}
          end={this.props.endNum}
          separator=","
          useEasing
          useGrouping
          duration={1}
          callback={this.onAnimationFinish}
        />
        <span>{this.state.isAnimated ? '尾' : null}</span>
      </div>
    );
  }
}

NumberJsx.propTypes = {
  index: PropTypes.number.isRequired,
  endNum: PropTypes.number.isRequired,
  onAnimationFinish: PropTypes.func,
  startNum: PropTypes.number.isRequired,
  toStartAnimation: PropTypes.bool,
};

NumberJsx.defaultProps = {
  onAnimationFinish: undefined,
  toStartAnimation: false,
};

class Block extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toAnimateNumber: false,
      toAnimateNote: false,
      toAnimateRanking: false,
    };
    this.onChange = this._onChange.bind(this);
    this.onNumberAnimationFinish = this._onAnimationStart.bind(this, 'note');
    this.onNoteAnimationFinish = this._onAnimationStart.bind(this, 'ranking');
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
        toAnimateNumber: true,
      });
    }
  }

  _onAnimationStart(target) {
    switch (target) {
      case 'note':
        this.setState({
          toAnimateNote: true,
        });
        break;
      case 'ranking':
        this.setState({
          toAnimateRanking: true,
        });
        break;
      default:

    }
  }

  render() {
    const { toAnimateNumber, toAnimateNote, toAnimateRanking } = this.state;
    const { index, startNum, endNum } = this.props;
    const fishImgSrc = fishImgArr[index];
    const nameImgSrc = nameImgArr[index];
    const noteImgSrc = noteImgArr[index];
    const rankingImgSrc = rankingImgArr[index];

    return (
      <VisibilitySensor
        onChange={this.onChange}
        active={!toAnimateNumber}
        partialVisibility
        minTopValue={300}
      >
        <div className={baseStyle['animation-block']}>
          <div className={cx(style[`fish0${index + 1}`], baseStyle['ab-center'])}>
            <img src={fishImgSrc} role="presentation" />
          </div>
          <div className={cx(style[`name0${index + 1}`], baseStyle['ab-center'])}>
            <img src={nameImgSrc} role="presentation" />
          </div>
          <NumberJsx
            index={index}
            startNum={startNum}
            endNum={endNum}
            toStartAnimation={toAnimateNumber}
            onAnimationFinish={toAnimateNumber ? this.onNumberAnimationFinish : undefined}
          />
          <Animate
            {...getNoteAnimationData(toAnimateNote)}
            className={style[`note0${index + 1}`]}
            imgSrc={noteImgSrc}
            onAnimationFinish={toAnimateNote ? this.onNoteAnimationFinish : undefined}
          />
          <Animate
            {...getRankingAnimationData(toAnimateRanking)}
            className={style[`ranking0${index + 1}`]}
            imgSrc={rankingImgSrc}
          />
        </div>
      </VisibilitySensor>
    );
  }
}

Block.propTypes = {
  index: React.PropTypes.number.isRequired,
  startNum: React.PropTypes.number,
  endNum: React.PropTypes.number.isRequired,
};

Block.defaultProps = {
  startNum: 0,
};

function Area() {
  const jsx = [];
  for (let index = 0; index < fishImgArr.length; index += 1) {
    jsx.push(
      <div key={index} className={cx(baseStyle.area, style[`area0${index + 1}`])}>
        <div className={cx(baseStyle.container)}>
          <img className={style[`bg0${index + 1}`]} src={bgImgArr[index]} role="presentation" />
          <Block
            index={index}
            startNum={0}
            endNum={numberArr[index]}
            key={index}
          />
        </div>
      </div>,
    );
  }
  return (
    <div className={style.area}>
      <div className={baseStyle.container}>
        <h3>
          <span className={baseStyle['seo-hidden']}>鮪魚、魷魚、秋刀魚，世界稱霸</span>
          <img className={style.title01} src={title01} alt="鮪魚、魷魚、秋刀魚，世界稱霸" />
        </h3>
        <p style={{ margin: 0 }}>
          <span className={baseStyle['seo-hidden']}>三大漁獲產量</span>
          <img className={style.title02} src={title02} alt="三大漁獲產量" />
        </p>
      </div>
      { jsx }
      <div className={cx(baseStyle['ab-center'], style.annotation)}>
        <span>註：為估算台灣一年用各種漁法所捕的各魚種數量，
          取下列各平均重量估算：鮪魚取大目鮪60公斤、魷魚分別取阿根廷魷0.25公斤及美洲大赤魷1.5公斤、
          秋刀魚0.11公斤，再以總重除以平均重量換算尾數。此表未包含正鰹（Skipjack）產量。資料來源：漁業署（2015）
        </span>
      </div>
    </div>
  );
}
export default Area;
