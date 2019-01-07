import React from "react";
import { connect } from "react-redux";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}

@connect(
  (store) => {
    return {
    }
  }
)
class HistoryPanelComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    this.actions = this.props.actions;
    this.drawChart();
    getData().then(data => {
      this.setState({ data });
    });
  }

  componentWillUnmount() {
  }

  drawChart() {
    
  }
  render() {
    const data = this.state.data;
    if(!data) return null;
    
    const xAccessor = d => d.date;
    const xExtents = [
			xAccessor(last(data)),
			xAccessor(data[data.length - 100])
		];
    
    return (
      <div className="history_panel">
      <ChartCanvas height={600}
		width={1000}
          xAccessor={xAccessor}
          xScale={scaleTime()}
          data={data}
          ratio={1}
					xExtents={xExtents}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}>

				<Chart id={1} yExtents={d => [d.high, d.low]}>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="left" orient="left" ticks={5} />
					<CandlestickSeries width={timeIntervalBarWidth(utcDay)}/>
				</Chart>
			</ChartCanvas>
      </div>
    );
  }
}

export default HistoryPanelComponent;