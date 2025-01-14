function supportClick(chart, type) {
  chart.canvas.onclick = function(evt) {
    var activePoints = chart.getElementsAtEvent(evt);
    if (activePoints && activePoints.length > 0) {
      //console.log(chart.config.data.labels[activePoints[0]._index], type)
      let event = new CustomEvent('visClick', {
        detail: {
          type: type,
          label: chart.config.data.labels[activePoints[0]._index]
        }
      });
      document.dispatchEvent(event);
    }
  }
}

function draw_vis(db_object) {
  // make the table
  db_object.toArray(makeTable)
  db_object.toArray(x => {
    // convert to sums by site
    let siteCounts = {}
    let modeCounts = {}
    let bubbles = []
    for (let j = 0; j < x.length; j++) {
      if (siteCounts.hasOwnProperty(x[j].site)) {
        siteCounts[x[j].site] = siteCounts[x[j].site] + x[j].imageCount
      } else {
        siteCounts[x[j].site] = x[j].imageCount
      }
      if (modeCounts.hasOwnProperty(x[j].modality)) {
        modeCounts[x[j].modality] = modeCounts[x[j].modality] + x[j].imageCount
      } else {
        modeCounts[x[j].modality] = x[j].imageCount
      }
      bubbles.push({
        x: x[j].subjectCount,
        y: x[j].studyCount,
        r: Math.log(x[j].imageCount)
      })
    }
    console.log(siteCounts)
    console.log(modeCounts)
    CHARTS.barChart = new Chart(document.getElementById("barVis"), {
      type: "bar",

      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      data: {
        labels: Object.keys(siteCounts),
        datasets: [{
          label: "Site Counts",
          data: Object.values(siteCounts),
          backgroundColor: binColors(24),
          borderWidth: 0
        }]
      }
    })
    CHARTS.pieChart = new Chart(document.getElementById("pieVis"), {
      type: "doughnut",

      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      data: {
        labels: Object.keys(modeCounts),
        datasets: [{
          label: "Modality Counts",
          data: Object.values(modeCounts),
          backgroundColor: binColors(24),
          borderWidth: 0
        }]
      }
    })
    CHARTS.bubbleChart = new Chart(document.getElementById("bubbleVis"), {
      type: "bubble",

      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      data: {
        labels: Object.keys(modeCounts),
        datasets: [{
          label: "Subject // Study // Image",
          data: bubbles
        }]
      }
    })
    supportClick(CHARTS.pieChart, "modality")
    supportClick(CHARTS.barChart, "site")
  })
}

function replaceChartData(chart, newData, newLabel) {
  chart.data.labels = [];
  chart.data.labels = newLabel;
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
    dataset.data = newData;
  });
  chart.update();
}


function redraw_vis(db_object) {
  // make the table
  db_object.toArray(makeTable)
  db_object.toArray(x => {
    // convert to sums by site
    let siteCounts = {}
    let modeCounts = {}
    let bubbles = []
    for (let j = 0; j < x.length; j++) {
      if (siteCounts.hasOwnProperty(x[j].site)) {
        siteCounts[x[j].site] = siteCounts[x[j].site] + x[j].imageCount
      } else {
        siteCounts[x[j].site] = x[j].imageCount
      }
      if (modeCounts.hasOwnProperty(x[j].modality)) {
        modeCounts[x[j].modality] = modeCounts[x[j].modality] + x[j].imageCount
      } else {
        modeCounts[x[j].modality] = x[j].imageCount
      }
      bubbles.push({
        x: x[j].subjectCount,
        y: x[j].studyCount,
        r: Math.log(x[j].imageCount)
      })
    }
    console.log(siteCounts)
    replaceChartData(CHARTS.bubbleChart, bubbles, [])
    replaceChartData(CHARTS.pieChart, Object.values(modeCounts), Object.keys(modeCounts))
    replaceChartData(CHARTS.barChart, Object.values(siteCounts), Object.keys(siteCounts))
  })
}

function register_events(base_db){
  document.addEventListener('visClick', x => {
    console.log(x.detail)
    // what is the current state (use url)
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has("fields")) {
      let fields = decodeURIComponent(searchParams.get('fields'))
      fields = JSON.parse(fields.replace("~", "+"))
      fields = fields[0].split("+")
      let query = JSON.parse(decodeURIComponent(searchParams.get('query')))
    }
    // determine new state
    // is type in fields? if so, add it to list
    // what key is this using now?
    // put query together in correct order
    // push to url
    // update db
  })
}
