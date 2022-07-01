import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

const transform = (data, field) => {
  const newData = d3
    .nest()
    .key((d) => d[field])
    .sortKeys(d3.ascending)
    .rollup((v) => v.length)
    .entries(data);
  return newData;
};

function HorizontalBarChart(props) {
  const margin = {
    top: 10, right: 10, bottom: 35, left: 10,
  };

  const fields = { y: 'key', x: 'value' };
  const fullData = transform(props.data, props.fields.y);
  const self = useRef();
  const scaleRef = useRef();
  const hightRef = useRef();
  const viewerRef = useRef();

  const createXScale = (f, width) => {
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(fullData, (d) => d[f])])
      .range([0, width]);
    return xScale;
  };

  const createYScale = (f, height) => {
    // set the ranges
    const yScale = d3
      .scaleBand()
      .domain(fullData.map((d) => d[f]))
      .range([height, 0])
      .padding(0.1);
    return yScale;
  };

  const createTextLabel = () => {
    viewerRef.current.selectAll('.label').remove();
    viewerRef.current
      .selectAll('.label')
      .data(fullData, (d) => d[fields.y])
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', 5)
      .attr('y', (d) => scaleRef.current.y(d[fields.y]) + scaleRef.current.y.bandwidth() / 2 + 4)
      .text((d) => d.key);
  };

  const drawBar = (selection, data, className = 'og') => {
    const updateBars = selection.selectAll(`rect.${className}`).data(data, (d) => d[fields.y]);

    const enterBars = updateBars.enter().append('rect');
    enterBars
      .attr('class', `${className}`)
      .attr('x', 0)
      .attr('height', scaleRef.current.y.bandwidth())
      .attr('y', (d) => scaleRef.current.y(d[fields.y]));
    enterBars.on('click', (enterData) => {
      const selected = enterBars.filter((d) => d === enterData);
      const value = selected.data()[0].key;
      const filter = {
        id: props.id,
        title: props.title,
        field: props.fields.y,
        operation: 'eq',
        values: value,
      };
      props.filterAdded([filter]);
    });

    enterBars.append('title').text((d) => `${d.key}:${d.value}`);

    updateBars
      .merge(enterBars)
      .transition()
      .duration(1000)
      .attr('width', (d) => scaleRef.current.x(d[fields.x]))
      .selectAll('.label')
      .text((d) => d.key);
    // update_bars

    updateBars.exit().transition().duration(1000).attr('width', 0)
      .remove();

    return updateBars;
  };

  useEffect(() => {
    setTimeout(() => {
      const rect = self.current.getBoundingClientRect();
      const innerWidth = rect.width - margin.left - margin.right;
      const innerHeight = rect.height - margin.top - margin.bottom;
      hightRef.current = innerHeight;

      d3.select(self.current).selectAll('svg').remove('svg');
      // create svg
      const svg = d3
        .select(self.current)
        .append('svg')
        .attr('width', rect.width)
        .attr('height', rect.height);
      // create viewer
      viewerRef.current = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      //
      const xScale = createXScale(fields.x, innerWidth);
      const yScale = createYScale(fields.y, innerHeight);
      scaleRef.current = { x: xScale, y: yScale };

      viewerRef.current
        .append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).tickSize(-innerHeight));

      drawBar(viewerRef.current, fullData, 'og');
      createTextLabel();
    }, 100);
  }, [props.layout]);

  useEffect(() => {
    setTimeout(() => {
      let data = [];
      if (props.filters.length > 0) {
        data = transform(props.filterData, props.fields.y);
      } else {
        data = fullData;
      }
      drawBar(viewerRef.current, data, 'ft');
      createTextLabel();
    }, 100);
  }, [props.filters, props.filterData, props.layout]);

  return <div id={props.id} ref={self} style={{ width: '100%', height: '100%' }} />;
}

export default HorizontalBarChart;

HorizontalBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fields: PropTypes.shape({ y: PropTypes.string.isRequired }).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  filterData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filterAdded: PropTypes.func.isRequired,
  layout: PropTypes.shape({
    width: PropTypes.number.isRequired,
    currentCols: PropTypes.number.isRequired,
  }).isRequired,
};