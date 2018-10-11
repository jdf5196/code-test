import React from 'react';
import * as d3 from "d3";

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
        this.removeChart = this.removeChart.bind(this);
        this.drawChart = this.drawChart.bind(this);
    }
    componentWillMount(){
        this.setState({
            data: this.props.data
        });
    }
    componentWillReceiveProps(nextProps){
        // Destroy old chart when new data is passed to the component and draw a new chart
        this.removeChart();
        this.setState({
            data: nextProps.data
        })
        this.drawChart(nextProps.data);
    }
    // Function to remove the old chart
    removeChart(){
        const chart = document.getElementById('chart');
        while(chart.hasChildNodes()){
            chart.removeChild(chart.lastChild);
        }
    }
    // Function to draw a new chart
    drawChart(newChartData){
        // Declare margins and size of the chart
        const margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        // Determine size and location of x and y axes
        const x = d3.scaleLinear().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
        // Create a color range for the dots
        var colors = d3.scaleLinear()
                    .domain([0,4000])
                    .range(["cyan", "#c394ff"]);
        // Create a chart and append it to the chart div
        const svg = d3.select("#chart").classed('svg-container', true).append("svg")
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .attr('viewBox', '-40 0 1051 635')
            .classed('svg-content-responsive', true)
          .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        // Create a tooltip
        const info = d3.select('#chart').append('div')
            .attr('class', 'info')
            .style('opacity', 0);
        x.domain([0, 100]);
        y.domain([0, 100]);

        // Draw a dot for each data point and color it based on its location
        svg.selectAll("dot")
            .data(newChartData).enter().append("circle")
            .attr("r", 5)
            .attr("cx", d=>x(d.x))
            .attr("cy", d=> y(d.y))
            .style("cursor", "pointer")
            .style("fill", d=>colors(d.x * d.y))
            .on("mouseover", function(d){
                d3.select(this).style('fill', 'black');
                info.transition().duration(200).style("opacity", 1);
                info.html(`<span>X: ${d.x}, Y: ${d.y}</span>`);

            })
            .on("mouseout", function(d){
                d3.select(this).style('fill', d=>colors(d.x * d.y));
                info.transition().duration(200).style("opacity", 0);
            })
        // Create axis labels
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
        svg.append("g").call(d3.axisLeft(y));
        svg.append('text').text('Y-Axis').attr('x', -250).attr('y', -40).attr('transform', 'rotate(-90)').style('text-anchor', 'left').style('font-size', '20px').style('fill', '#c2c2c2');
        svg.append('text').text('X-Axis').attr('x', 450).attr('y', 500).style('text-anchor', 'middle').style('font-size', '20px').style('fill', '#c2c2c2');
    }
    componentDidMount(){
       this.drawChart(this.state.data);
    }
    render(){
        return(
            <div id='chart' />
        )
    }

}

export default Chart;