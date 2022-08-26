import React, { useEffect, useRef, useState } from "react";
import { numFixed } from "../../../common/utils.js";
import * as d3 from "d3";

/**
 * @function Histogram
 * @description Creates an interactive histogram chart
 *              User can select specific range of x by brushing
 * @param {Object} data - total data without filtering
 * @param {Array} fields - contains filed to creat histogram on
 * @param {String} id - HTML id for the chart
 * @param {Integer} binsCount - number of bins to split data on
 * @param {Object} filterData - data after applying filters 
 * @param {Array} filters - current filters
 * @param {Function} filterAdded - handler for adding new filter
 * @returns {Component}
 */

const Histogram = ({
  data,
  fields,
  id,
  binsCount,
  filterData,
  filters,
  filterAdded,
}) => {
  const svgRef = useRef();
  const [Scales, setScales] = useState({
    x: d3.scaleLinear(),
    y: d3.scaleLinear(),
  });
  const [histogram, setHistogram] = useState({
    hist: d3.histogram(),
    bins: null,
  });
  const margin = { top: 10, right: 10, bottom: 30, left: 40 };

  // initialize svg and draw base histogram
  useEffect(() => {
    setTimeout(() => {
      console.log("what");
      let rect = svgRef.current.getBoundingClientRect();
      const innerWidth = rect.width - margin.left - margin.right;
      const innerHeight = rect.height - margin.top - margin.bottom;

      const svg = d3
        .select(svgRef.current)
        .append("svg")
        .attr("width", rect.width)
        .attr("height", rect.height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      Scales.x
        .domain([
          0,
          d3.max(data, (d) => {
            return d[fields.x];
          }),
        ])
        .range([0, innerWidth]);

      histogram.hist
        .value((d) => d[fields.x])
        .domain(Scales.x.domain())
        .thresholds(Scales.x.ticks(binsCount));

      histogram.bins = histogram.hist(data);

      Scales.y = d3
        .scaleLinear()
        .range([innerHeight, 0])
        .domain([0, d3.max(histogram.bins, (d) => d.length)]);

      // brush
      const brush = d3
        .brushX()
        .extent([
          [0, 0],
          [innerWidth, innerHeight],
        ])
        .on("end", () => {
          if (d3.event.selection) {
            const [x0, x1] = [d3.event.selection[0], d3.event.selection[1]];
            filterAdded([
              {
                id: id,
                field: fields.x,
                operation: "range",
                values: [
                  numFixed(Scales.x.invert(x0)),
                  numFixed(Scales.x.invert(x1)),
                ],
              },
            ]);
          }
        });
      svg.append("g").call(brush);

      // draw x-axis
      svg
        .append("g")
        .attr("transform", "translate(0," + innerHeight + ")")
        .call(d3.axisBottom(Scales.x));

      // draw y-axis
      const view = svg
        .append("g")
        .call(d3.axisLeft(Scales.y))
        .append("g")
        .attr("class", "hist-area");

      // draw histogram rectangles
      view
        .selectAll(".bar")
        .data(histogram.bins)
        .join("rect")
        .attr("class", "bar")
        .attr("x", 1)
        .attr("transform", function (d) {
          return "translate(" + Scales.x(d.x0) + "," + Scales.y(d.length) + ")";
        })
        .attr("width", function (d) {
          return Math.max(Scales.x(d.x1) - Scales.x(d.x0) - 1, 0);
        })
        .attr("height", function (d) {
          return innerHeight - Scales.y(d.length);
        })
        .style("fill", "#87CEFA");
    }, 100);
  }, []);

  // draw filtered histogram
  useEffect(() => {
    setTimeout(() => {
      const rect = svgRef.current.getBoundingClientRect();
      const innerHeight = rect.height - margin.top - margin.bottom;

      let bins = histogram.bins;
      if (filters.length != 0) {
        bins = histogram.hist(filterData);
      }

      d3.select(svgRef.current)
        .selectAll(".hist-area")
        .selectAll(".bar-f")
        .data(bins)
        .join("rect")
        .attr("class", "bar-f")
        .style("transform", "scale(1, -1)")
        .attr("x", (d) => Scales.x(d.x0))
        .attr("y", (d) => -innerHeight)
        .transition()
        .duration(1000)
        .attr("width", function (d) {
          return Math.max(Scales.x(d.x1) - Scales.x(d.x0) - 1, 0);
        })
        .attr("height", function (d) {
          return innerHeight - Scales.y(d.length);
        })
        .style("fill", "#4682B4");
    }, 100);
  }, [filterData]);
  return (
    <div id={id} ref={svgRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default Histogram;
