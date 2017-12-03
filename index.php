<html>
<meta charset="utf-8">
<head>
	<title>Sistem Informasi Geografis | Jawa Tengah</title>
	<link rel="shortcut icon" href="source/img/JT.png">
	<link type="text/css" rel="stylesheet" href="style.css">
	<link type="text/css" rel="stylesheet" href="libs/materialize/css/materialize.css" media="screen,projection"/>
	<script src="libs/d3/d3.js" charset="utf-8"></script>
	<script type="text/javascript" src="libs/jquery/jquery.js" charset="utf-8"></script>
	<script type="text/javascript" src="libs/colorbrewer/colorbrewer.js" charset="utf-8"></script>
	<script type="text/javascript" src="libs/materialize/js/materialize.js"></script>
	<script type="text/javascript" src="libs/topojson/topojson.js" charset="utf-8"></script>
	<script type="text/javascript" src="libs/topojson/topojson-client.js" charset="utf-8"></script>
</head>
<body>
	<div class="row all20 div-contents">
		<div class="col s8 rev gapless">
			<div class="titleandnav all20 blue-grey darken-1 center">
				<span class="titleonnav white-text" style="font-size: 20px">Penduduk Jawa Tengah Tahun 2014</span>
			</div>
			<svg class="svg-contents"></svg>
		</div>
		<div class="col s4 grey gapless lighten-2 information">
			<div class="teal lighten-1 white-text all20 center">
				<img class="logo-kabkota" src="source/img/JT.png" style="max-height: 150px">
			</div>
			<div class="teal darken-1 white-text all20 center">
				<p class="gapless main-title" style="font-size: 20px;">PROVINSI JAWA TENGAH</p>
				<span style="font-size: 15px; opacity: .75" class="secondary-title">Sistem Informasi Geografis</span>
			</div>
			<div class="grey lighten-2 grey-text text-darken-2 information-detail" style="overflow-y: scroll; height: 54.5%;">
				<div class="info-provinsi">
					<div class="row gapless">
						<div class="input-field col s12 white teal-text" style="padding: 10px; margin: 0">
							<select class="categoryoption" id="categoryoption">
							</select>
						</div>
						<div class="col s12 divider"></div>
						<div class="col s12 white all20">
							<p class="judulkategori">Gubernur</p>
							<h5 class="gubernur isikategori teal-text">Ganjar Pranowo</h5>
						</div>
						<div class="col s12 divider"></div>
						<div class="col s12 white all20">
							<p class="judulkategori">Pusat Pemerintahan</p>
							<h5 class="pusat-provinsi isikategori teal-text">Semarang</h5>
						</div>
						<div class="col s12 divider"></div>
						<div class="col s12 white all20">
							<p class="judulkategori">Luas Daerah</p>
							<h5 class="luas-provinsi isikategori teal-text">32548 km<sup>2</sup></h5>
						</div>
					</div>
				</div>
				<div class="info-kabupaten">
					<div class="row gapless">
						<div class="col s12 divider"></div>
						<div class="col s12 white all20">
							<p class="judulkategori">Bupati / Walikota</p>
							<h5 class="bupatiwalikota isikategori teal-text"></h5>
						</div>
						<div class="col s12 divider"></div>
						<div class="col s12 white all20">
							<p class="judulkategori">Pusat Pemerintahan</p>
							<h5 class="pusat-kabupaten isikategori teal-text"></h5>
						</div>
						<div class="col s12 divider"></div>
						<div class="col s4 white all20">
							<p class="judulkategori">Desa</p>
							<h5 class="jumlah-desa isikategori teal-text"></h5>
						</div>
						<div class="col s4 white all20">
							<p class="judulkategori">Kelurahan</p>
							<h5 class="jumlah-kelurahan isikategori teal-text"></h5>
						</div>
						<div class="col s4 white all20">
							<p class="judulkategori">Kecamatan</p>
							<h5 class="jumlah-kecamatan isikategori teal-text"></h5>
						</div>
						<div class="col s12 divider"></div>
						<div class="col s12 white all20">
							<p class="judulkategori">Luas Daerah</p>
							<h5 class="luas-daerah isikategori teal-text"></h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="card horizontal valign-wrapper" id="tooltip">
		<div class="card-image">
			<img id="tooltip-img">
		</div>
		<div class="card-content">
			<p id="tooltip-name" style="font-size: 20px"></p>
			<span id="tooltip-hasc" class="grey-text"></span>
			<span id="tooltip-jumlah"></span>
		</div>
	</div>
	<script type="text/javascript" src="script.js" charset="utf-8"></script>
</body>
