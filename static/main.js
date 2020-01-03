var
  load = function() {
    $('#graph_btn').on('click', function (e) {
      draw();
    })

    $('#example_1').on('click', function (e) {
      $('#data').val('0.1\n0.2\n0.2\n0.3\n0.3\n0.3\n0.4\n0.4\n0.5\n0.6\n0.9');
      draw();
      return false;
    });

    $('#example_2').on('click', function (e) {
      $('#data').val('0.1,0.2\n0.2,0.2\n0.2,0.3\n0.3,0.25\n0.3,0.4\n0.3,0.4\n0.4,0.35\n0.4,0.6\n0.5,0.5\n0.6,0.65\n0.9,0.8');
      draw();
      return false;
    });

    $('#example_3').on('click', function (e) {
      $('#data').val('0.15,0.2,snail\n0.2,0.2,finch\n0.2,0.3,giraffe\n0.3,0.25,cat\n0.3,0.4,tiger\n0.3,0.4,mongoose\n0.4,0.35,human\n0.4,0.6,kangaroo\n0.5,0.5,horse\n0.6,0.65,dolphin\n0.9,0.8,cheetah');
      draw();
      return false;
    });

 
  },

  scatter = function(rows, sep) {
      var x = [], y = [], z = [], labels = (rows[0].split(sep).length > 2);
      
      for (row in rows) {
        values = rows[row].split(sep);
        x.push(values[0]);
        y.push(values[1]);
        
        if (labels) {
          z.push(values[2]);
        }
      }
      var trace = {
          x: x,
          y: y,
          type: 'scatter',
          mode: 'markers'
      };
      if (labels) {
        trace['text'] = z;
      }
      var data = [trace];
      Plotly.newPlot('graph', data, {hovermode: 'closest'});
      $('#status').text("Plotted " + rows.length + " values as a scatter plot");
   },

  draw = function() {
    var rows = $('#data').val().split(/\n/);
    if (rows.length == 0) {
      $('#status').val("No rows found");
      return;
    }
    if (rows[0].indexOf(',') != -1) { 
      scatter(rows, ',');
    }
    else if (rows[0].indexOf('\t') != -1) {
      scatter(rows, '\t');
    }
    else {
      var trace = {
          x: rows,
          type: 'histogram',
      };
      var data = [trace];
      Plotly.newPlot('graph', data);
      $('#status').text("Plotted " + rows.length + " values as a histogram");
    }
 };

