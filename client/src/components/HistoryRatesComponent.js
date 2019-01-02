import React from "react";
import { connect } from "react-redux";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

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
  }

  componentWillUnmount() {
  }

  drawChart() {
    
  }
  render() {
    const xAccessor = d => d.date;
		const xExtents = [

    ];
    
    return (
      <div className="history_panel">
      <ChartCanvas height={400}
					margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
					seriesName="MSFT"
          xAccessor={xAccessor}
          xScale={scaleTime()}
          data={[{date:''}]}
					xExtents={xExtents}>

				<Chart id={1} yExtents={d => [d.high, d.low]}>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="left" orient="left" ticks={5} />
					<CandlestickSeries width={500}/>
				</Chart>
			</ChartCanvas>
      </div>
    );
  }
}

export default HistoryPanelComponent;