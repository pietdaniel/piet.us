if ( ! Detector.webgl ) {
	Detector.addGetWebGLMessage();
	document.getElementById( 'container' ).innerHTML = "";
}

var container, stats;
var camera, scene, renderer;

var parameters = {
	width: 2000,
	height: 2000,
	widthSegments: 250,
	heightSegments: 250,
	depth: 1500,
	param: 4,
	filterparam: 1
}

var waterNormals;

init();
animate();

function init() {
	container = document.getElementById( 'container' );
	document.body.appendChild( container );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, .1, 3000000 );
	
	camera.position.set( parameters.width, parameters.width, parameters.height);
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.noPan = true;
	controls.noZoom = true;

	controls.maxPolarAngle = Math.PI * .498;
	controls.minPolarAngle = Math.PI * .45;

	directionalLight = new THREE.DirectionalLight( 0xFF0000, 1 );
	directionalLight.position.set( - 1, 0.4, - 1 );
	scene.add( directionalLight );

	
	waterNormals = new THREE.ImageUtils.loadTexture( 'normals.jpg' );
	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 

	water = new THREE.Water( renderer, camera, scene, {
		textureWidth: 512, 
		textureHeight: 512,
		waterNormals: waterNormals,
		alpha: 	.9,
		sunDirection: directionalLight.position.normalize(),
		sunColor: 0xFFFFFF,
		waterColor: 0x001eff,
		distortionScale: 50.0,
	} );

	mirrorMesh = new THREE.Mesh(
		new THREE.PlaneGeometry( parameters.width * 500, parameters.height * 500, 50, 50 ), 
		water.material
	);		

	mirrorMesh.add( water );
	mirrorMesh.rotation.x = - Math.PI * 0.5;
	scene.add( mirrorMesh );


	var cubeMap = new THREE.Texture( [] );
	cubeMap.format = THREE.RGBFormat;
	cubeMap.flipY = false;

	var loader = new THREE.ImageLoader();
	loader.load( 'skybox.png', function ( image ) {

		var getSide = function ( x, y ) {
			var size = 1024;

			var canvas = document.createElement( 'canvas' );
			canvas.width = size;
			canvas.height = size;

			var context = canvas.getContext( '2d' );
			context.drawImage( image, - x * size, - y * size );

			return canvas;
		};

		cubeMap.image[ 0 ] = getSide( 2, 1 ); // px
		cubeMap.image[ 1 ] = getSide( 0, 1 ); // nx
		cubeMap.image[ 2 ] = getSide( 1, 0 ); // py
		cubeMap.image[ 3 ] = getSide( 1, 2 ); // ny
		cubeMap.image[ 4 ] = getSide( 1, 1 ); // pz
		cubeMap.image[ 5 ] = getSide( 3, 1 ); // nz
		cubeMap.needsUpdate = true;
	} );

	var cubeShader = THREE.ShaderLib['cube'];
	cubeShader.uniforms['tCube'].value = cubeMap;

	var skyBoxMaterial = new THREE.ShaderMaterial( {
		fragmentShader: cubeShader.fragmentShader,
		vertexShader: cubeShader.vertexShader,
		uniforms: cubeShader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	});

	var skyBox = new THREE.Mesh(
		new THREE.BoxGeometry( 1000000, 1000000, 1000000 ),
		skyBoxMaterial
	);
	
	scene.add( skyBox );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	water.material.uniforms.time.value += 1.0 / 60.0;
	controls.update();
	water.render();
	renderer.render( scene, camera );
}

var qq=Math.floor(Math.random()*10%4);
console.log("Welcome to piet.us!")
$(document).ready(function() {
  $('#hello').hide();
  $('#code').hide()
  $('#music').hide()
  $('#school').hide()
  $('#countdown').hide();
  $('#weird').hide()

  $('#countdown').aTime({
    "font-size" : "16px",
  });
    $("#hello").fadeIn("slow",function(){
        $("#code").fadeIn(1200, function() {
            $("#music").fadeIn(1800,function() {
                $("#school").fadeIn(2400,function() {
                    $("#countdown").fadeIn(1200);
                    $("#weird").delay(10000).fadeIn(14800);
                    if (qq==0) {
                      $("#link").attr("href",'http://piet.us/game.html')
                    }
                    if (qq==1) {
                      $("#link").attr("href",'readthesource.html')
                    }
                    if (qq==2) {
                      $("#link").attr("href",'http://piet.us/randomwalk/')
                    }
                    if (qq==3) {
                      var qqq = Math.floor((Math.random()*100)%17+1)
                      $("#link").attr("href","glitched/"+qqq+".png") 
                    }
                })
            })
        })
    });
});