/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const singleBarGroupPropTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  fill: PropTypes.string.isRequired,
};

function SingleBarGroup(props) {
  const {
    name,
    value,
    height,
    scale,
    fill,
  } = props;
  const barPadding = 2;
  const width = scale * value;
  const xFormat = d3.format('.2n');

  return (
    <g>
      <rect
        className='single-bar-group'
        y={barPadding}
        width={width}
        height={height - barPadding}
        fill={fill}
      />
      <text
        className='single-bar-group-value-label'
        x={width + 4}
        y={height / 2}
        alignmentBaseline='middle'
      >
        {xFormat(value)}
      </text>
      <text
        className='single-bar-group-name-label'
        x='10'
        y={height / 2}
        alignmentBaseline='middle'
      >
        {name}
      </text>
    </g>
  );
}

SingleBarGroup.propTypes = singleBarGroupPropTypes;


const propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

function Bar(props) {
  const {
    data,
    width,
    height,
  } = props;

  const formatter = d3.format('d');

  const barHeight = Math.trunc((height / data.length) - 1);
  const values = data.map(d => formatter(d.value));
  let maxValue = Math.max(...values);
  if (maxValue === 0) {
    maxValue = 1;
  }
  const scale = width * 0.8 / maxValue;
  const interpolate = d3.interpolateRgb('#eaaf79', '#bc3358');
  const barGroups = data.map((d, index) => (
    <g transform={`translate(40, ${index * barHeight})`} key={interpolate(index / (data.length - 1))}>
      <SingleBarGroup
        {...d}
        height={barHeight}
        scale={scale}
        fill={interpolate(index / (data.length - 1))}
      />
    </g>
  ));

  return (
    <svg width={width} height={height} className='bar-container'>
      <g>
        {barGroups}
      </g>
    </svg>
  );
}

Bar.propTypes = propTypes;

export default Bar;
