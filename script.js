var width = $(".rev").width(),
height = $(".div-contents").height(),
navheight = $(".titleandnav").height() + 2*parseInt($(".titleandnav").css("padding")),
active = d3.select(null),
bgcolor = "#b0bec5",
domain = [],
judul = ["Judul"],
context = "",
tipe = ""
colorfill = [colorbrewer.Reds[5], colorbrewer.Blues[5], colorbrewer.Greens[5]];
var opt = $(".categoryoption");
d3.json("http://localhost/latihan/sig/services.php?request=getAvailableData", function (error, data) {
  data.forEach(function (i) {
    opt.append("<option value='"+i.id_atribut+"' "+ (i.id_atribut =="penduduk_2014" ? "selected" : "") +">"+i.nama+"</option>");
  })
  $('select').material_select();
});

opt.on("change", function (d) {
  tipe = $(this).val();
  $.ajax({
    url : "services.php",
    type : "GET",
    dataType : "json",
    data : {
      "request" : "getDataUtama",
      "tipe" : tipe
    },
    success : function (d){
      var val = d.map(function(a) {return parseFloat(a.value);}),
      max = Math.max(...val);
      domain = [0, max/4, 2*max/4, 3*max/4];

      fill = d3.scaleThreshold()
      .domain(domain)
      .range(colorfill[getRandomInt(0,2)]);
      updateLegend();

      d.forEach(function (i) {
        d3.select("#"+ i.hasc)
        .style("fill", fill(i.value))
        .attr("title", i.value)
        .on("click", clicked)
        .on("mouseover", hovered)
        .on("mouseout", hoverout)
        .on("mousemove", mouseMoved);
      });
    },
    error : function (error) {

    }
  });

  $.ajax({
    url : "services.php",
    type : "GET",
    dataType : "json",
    data : {
      "request" : "getAvailableData",
      "id" : tipe
    },
    success : function (d){
      d3.select(".titleonnav")
      .html(d[0].nama);
    },
    error : function (error) {

    }
  });
});

d3.select(".information")
.style("height", height + "px")
.style("border-top-right-radius", "3px")
.style("border-bottom-right-radius", "3px")
.style("overflow", "hidden");

var svg = d3.select(".svg-contents")
.attr("height", height-navheight)
.attr("width", width)
.style("border-bottom-left-radius", "3px")
.style("background", bgcolor);

var projection = d3.geoMercator()
.scale(13000)
.center([110.2,-7.45])
.translate([width/2, height/2]);

var path = d3.geoPath(projection);

var fill = 0;

var tooltip = d3.select("#tooltip")
.style("position", "absolute")
.style("z-index", "10")
.style("display", "none");

var infoprov = d3.select(".info-provinsi")
.style("display", "");
var infokab = d3.select(".info-kabupaten")
.style("display", "none");

svg.append("rect")
.attr("class", "background")
.attr("width", width+20)
.attr("height", height)
.on("click", reset);

var g = svg.append("g")
.style("stroke-width", "1.5px");

//shp dasar
function jsonParse(callback) {
  setTimeout(function () {
    d3.json("source/jateng.json", function (error, topo) {
      if (error) throw error;

      g.selectAll("path")
      .data(topojson.feature(topo, topo.objects.jateng).features)
      .enter().append("path")
      .attr("d", path)
      .attr("class", "feature")
      .attr("id", function (d) {return d.properties.hasc;});

      g.append("path")
      .datum(topojson.mesh(topo, topo.objects.jateng, function(a, b) { return a !== b; }))
      .attr("class", "mesh")
      .attr("d", path);

      callback(null);
    }, 0);
  });
}

//loader data
function loadData(callback) {
  setTimeout(function () {
    d3.json("http://localhost/latihan/sig/services.php?request=getDataUtama&tipe=penduduk_2014", function (error, d) {
      var val = d.map(function(a) {return parseFloat(a.value);}),
      max = Math.max(...val);
      domain = [0, max/4, 2*max/4, 3*max/4];

      tipe = "penduduk_2014";
      fill = d3.scaleThreshold()
      .domain(domain)
      .range(colorfill[getRandomInt(0,2)]);

      d.forEach(function (i) {
        d3.select("#"+ i.hasc)
        .style("fill", fill(i.value))
        .attr("title", i.value)
        .on("click", clicked)
        .on("mouseover", hovered)
        .on("mouseout", hoverout)
        .on("mousemove", mouseMoved);
      });
      updateLegend();
    });
    callback(null);
  }, 0);
}

function updateLegend() {
  //legend
  d3.selectAll("g.legend").remove();
  var legend = svg.selectAll("g.legend")
  .data(domain)
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 55, ls_h = 10;

  legend.append("rect")
  .attr("x", function (d,i) {return i*ls_w + 20})
  .attr("y", function (d,i) {return height - navheight - ls_h - 40})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", function(d, i) { return fill(d); });

  legend.append("rect")
  .attr("x", function (d,i) {return i*ls_w + 20})
  .attr("y", function (d,i) {return height - navheight - ls_h - 30})
  .attr("width", 3)
  .attr("height", ls_h + 3)
  .style("fill", function(d, i) { return fill(d); });

  legend.append("text")
  .attr("x", function (d,i) {return i*ls_w + 25})
  .attr("y", function (d,i) {return height - navheight - ls_h - 20})
  .attr("font-size", "10px")
  .attr("class", function (d,i) {return "legend" + i;})
  .style("fill", function (d,i) {return fill(domain[i])})
  .text(function(d, i){ return domain[i]; });
}

var q = d3.queue(1);
q.defer(jsonParse);
q.defer(loadData);
q.await(function(error) {
  if (error) throw error;
});

//mouse event
function hovered(d) {
  tooltip.select("#tooltip-img")
  .attr("src", "source/img/" + d.properties.hasc + ".png");
  tooltip.select("#tooltip-name")
  .html(d.properties.nama);

  $.ajax({
    url : "services.php",
    type : "GET",
    dataType : "json",
    data : {
      "request" : "getDataUtama",
      "tipe" : tipe,
      "hasc" : d.properties.hasc
    },
    success : function (ds){
      console.log(ds);
      tooltip.select("#tooltip-hasc")
      .html(ds[0].hasc);
      tooltip.select("#tooltip-jumlah")
      .html(ds[0].value);
    },
    error : function (error) {

    }
  });

  if(active.node() !== this) {
    d3.select(this).classed("hovered", true);
  }
  return tooltip.style("display", "");
}

function hoverout(d) {
  if(active.node() !== this) {
    d3.select(this).classed("hovered", false);
  }
  return tooltip.style("display", "none");
}

function clicked(d) {
  if (active.node() === this) {
    d3.select(this).classed("hovered", true);
    return reset();
  }
  active.classed("active", false);
  d3.select(this).classed("hovered", false);
  active = d3.select(this).classed("active", true);

  var bounds = path.bounds(d),
  dx = bounds[1][0] - bounds[0][0],
  dy = bounds[1][1] - bounds[0][1],
  x = (bounds[0][0] + bounds[1][0]) / 2,
  y = (bounds[0][1] + bounds[1][1]) / 2,
  scale = .5 / Math.max(dx / width, dy / height),
  translate = [width / 2 - scale * x, height / 2 - scale * y];

  g.transition()
  .duration(750)
  .style("stroke-width", 1.5 / scale + "px")
  .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

  infokab.style("display", "");
  infoprov.style("display", "none");

  $.ajax({
    url : "services.php",
    type : "GET",
    dataType : "json",
    data : {
      "request" : "getProfilKab",
      "hasc" : d.properties.hasc
    },
    success : function (result){
      d3.select(".logo-kabkota")
      .attr("src", "source/img/" + result[0].hasc + ".png");
      d3.select(".main-title")
      .html(result[0].nama);
      d3.select(".secondary-title")
      .html(result[0].jenis_wilayah == "1" ? "Kabupaten" : "Kota");
      d3.select(".bupatiwalikota")
      .html(result[0].bupati_walikota);

      var pusat = d3.select(".pusat-kabupaten");
      if(result[0].pusat) {
        pusat.html(result[0].pusat);
      } else {
        pusat.html("-");
      }
      d3.select(".jumlah-desa")
      .html(result[0].jml_des);
      d3.select(".jumlah-kecamatan")
      .html(result[0].jml_kec);
      d3.select(".jumlah-kelurahan")
      .html(result[0].jml_kel);
      d3.select(".luas-daerah")
      .html(result[0].luas + " km")
      .append("sup")
      .html("2");
    },
    error : function (error) {

    }
  });
}

function mouseMoved(d) {
  return tooltip.style("top",(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
}

function reset() {
  active.classed("active", false);
  active = d3.select(null);

  d3.select(".logo-kabkota")
  .attr("src", "source/img/JT.png");
  d3.select(".main-title")
  .html("PROVINSI JAWA TENGAH");
  d3.select(".secondary-title")
  .html("Sistem Informasi Geografis");

  d3.select(".bupatiwalikota")
  .html("");
  d3.select(".pusat-kabupaten")
  .html("");
  d3.select(".jumlah-desa")
  .html("");
  d3.select(".jumlah-kecamatan")
  .html("");
  d3.select(".jumlah-kelurahan")
  .html("");
  d3.select(".luas-daerah")
  .html("");

  infokab.style("display", "none");
  infoprov.style("display", "");

  g.transition()
  .duration(750)
  .style("stroke-width", "1.5px")
  .attr("transform", "");
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
