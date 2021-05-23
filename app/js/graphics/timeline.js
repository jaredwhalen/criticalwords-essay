import * as d3 from "d3";

export default function timeline(Stepper, target) {

  let colors = require('../../data/colors.json')

  Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
  }

  const showDuration = 480.7825

  let {
    dimensions: {
      height,
      width,
      margin
    }
  } = Stepper

  var mindate = new Date(),
    maxdate = new Date().addHours(showDuration);

  var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let slide2Text = document.querySelector('.slide[data-id="3"]').querySelector('.p-inner.text')
  slide2Text.innerHTML = slide2Text.innerHTML.replace('{{caughtUpDate}}', `${mL[maxdate.getMonth()]} ${maxdate.getDate()}`)

  var getDaysArray = function(start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  let dateRange = getDaysArray(mindate, maxdate)

  var calendarRows = function(month) {
    var m = d3.timeMonth.floor(month);
    return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m, 1)).length;
  }

  var minDate = d3.min(dateRange, function(d) {
    return new Date(d);
  });
  var maxDate = d3.max(dateRange, function(d) {
    return new Date(d);
  });

  var cellMargin = 2,
    cellSize = width / 20;

  var day = d3.timeFormat("%w"),
    week = d3.timeFormat("%U"),
    format = d3.timeFormat("%Y-%m-%d"),
    titleFormat = d3.utcFormat("%a, %d-%b"),
    monthName = d3.timeFormat("%B"),
    months = d3.timeMonth.range(d3.timeMonth.floor(minDate), maxDate);

  for (var i = 0; i < dateRange.length; i++) {
    dateRange[i].today = dateRange[i].toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );
  }

  var svg = d3.select(target)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

  var month = svg
    .selectAll("svg")
    .data(months)
    .enter()
    .append("svg")
    .attr("class", "month")
    .attr("width", (cellSize * 7) + (cellMargin * 8))
    .attr("height", function(d) {
      var rows = calendarRows(d);
      return (cellSize * rows) + (cellMargin * (rows + 1)) + 20; // the 20 is for the month labels
    })
    .append("g")

  month.append("text")
    .attr("class", "month-name")
    .attr("x", ((cellSize * 7) + (cellMargin * 8)) / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text(function(d) {
      return monthName(d);
    })
    .attr("fill", colors.MATT)

  var rect = month.selectAll("rect.day")
    .data(function(d, i) {
      return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth() + 1, 1));
    })
    .enter().append("rect")
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("fill", colors.MATT)
    .attr("x", function(d) {
      return (day(d) * cellSize) + (day(d) * cellMargin) + cellMargin;
    })
    .attr("y", function(d) {
      return ((week(d) - week(new Date(d.getFullYear(), d.getMonth(), 1))) * cellSize) +
        ((week(d) - week(new Date(d.getFullYear(), d.getMonth(), 1))) * cellMargin) +
        cellMargin + 20;
    })
    .datum(format);

  rect.append("title")
    .text(function(d) {
      return titleFormat(new Date(d));
    });

  var lookup = d3.nest()
    .key(function(d) {
      return d.today;
    })
    .rollup(function(leaves) {
      return leaves.length;
    })
    .object(dateRange);

  let count = d3.nest()
    .key(function(d) {
      return d.today;
    })
    .rollup(function(leaves) {
      return leaves.length;
    })
    .entries(dateRange);

  rect.filter(function(d) {
      return d in lookup;
    })
    .style("fill", function(d) {
      return colors.TRAVIS
    })

}
