/**
 * @author me!
 */
 function activate(){
var app = {

  
  //needed for scene
  camera : null,
  controls : null,
  scene : null,
  light : null,
  time : Date.now(),
  renderer : null,
  
  
  cylinder : null,
  
  
  //bits and pieces
  blocker : document.getElementById( 'blocker' ),
  instructions : document.getElementById( 'instructions' ),
  element : document.body,  
  
  
  // the window / viewport
  W : window.innerWidth,
  H : window.innerHeight,
  
  
  //radians
  degra : function(degree){ 
    return degree*(Math.PI/180); 
  },

  
  //load image
  loadImage : function(url){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            console.log('Image loaded: ' + url);
        }else{
          console.log("Image load failed: " + url);
        }
    };
    xhr.send(); 
  },
  
  
  //listeners + pointerlock etc..
  listener : function(){
    
      app.element = document.body;
      
      document.addEventListener( 'pointerlockchange', app.pointerlockchange, false );
      document.addEventListener( 'mozpointerlockchange', app.pointerlockchange, false );
	    document.addEventListener( 'webkitpointerlockchange', app.pointerlockchange, false );
    
      document.addEventListener( 'pointerlockerror', app.pointerlockerror, false );
	    document.addEventListener( 'mozpointerlockerror', app.pointerlockerror, false );
	    document.addEventListener( 'webkitpointerlockerror', app.pointerlockerror, false );
    
    
    	app.instructions.addEventListener( 'click', function ( event ) {

		      this.style.display = 'none';

		      // Ask the browser to lock the pointer
		      app.element.requestPointerLock = app.element.requestPointerLock || app.element.mozRequestPointerLock ||
            app.element.webkitRequestPointerLock;

		      if ( /Firefox/i.test( navigator.userAgent ) ) {

			        var fullscreenchange = function ( event ) {

				          if ( document.fullscreenElement === app.element || document.mozFullscreenElement === app.element || 
                      document.mozFullScreenElement === app.element ) {

					            document.removeEventListener( 'fullscreenchange', fullscreenchange );
					            document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

					            app.element.requestPointerLock();
				          }

			        }  

			        document.addEventListener( 'fullscreenchange', fullscreenchange, false );
			        document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

			        app.element.requestFullscreen = app.element.requestFullscreen || 
                app.element.mozRequestFullscreen || app.element.mozRequestFullScreen || app.element.webkitRequestFullscreen;

			        app.element.requestFullscreen();

		    } else {
          
			        app.element.requestPointerLock();
		    }

	    }, false );
    },
  
   
  
  //pointer lock enable controls 
  pointerlockchange : function ( event ) {
    
    havePointerLock = 'pointerLockElement' in document 
    || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
      
    if ( havePointerLock ) {
      
		      if ( document.pointerLockElement === app.element || 
               document.mozPointerLockElement === app.element || 
               document.webkitPointerLockElement === app.element ) {

			         app.controls.enabled = true;
			         blocker.style.display = 'none';

		      } else {

			        app.controls.enabled = false;
			        blocker.style.display = '-webkit-box';
			        blocker.style.display = '-moz-box';
			        blocker.style.display = 'box';
			        instructions.style.display = '';

		      }
	    
    }
  },
    
    
  //pointer lock error  
  pointerlockerror : function ( event ) {
    app.instructions.style.display = '';
	},

  
  
  
  
  //int scene add objects
  init : function(){
  
      var camera = new THREE.PerspectiveCamera( 75, this.W / this.H, 1, 10000 );
      camera.position.set( 0, 25, 0 );
  
      var scene = new THREE.Scene();
      //scene.fog = new THREE.FogExp2( 0x000000, 0.0035 );
      scene.fog = new THREE.FogExp2( 0xFFFFFF, 0.0010 );
      //scene.fog = new THREE.FogExp2( 0x72645b, 0.0035 );
      //scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
  
      var controls = new THREE.PointerLockControls( camera );
      scene.add( controls.getObject() );
  
      //scene.add( new THREE.AmbientLight( 0x000000 ) );
      
      /*
      light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 0, 0.5, 1 ).normalize();
      scene.add( light );
      */
    
      var sphere = new THREE.SphereGeometry( 20, 32, 16 );
  
      material_sphere1 = new THREE.MeshLambertMaterial({ 
        color: 0xffaa00, 
        shading: THREE.FlatShading 
      });
  
      material_sphere2 = new THREE.MeshLambertMaterial({ 
        color: 0xff2200, 
        shading: THREE.FlatShading 
      });
  
      var s = 1;

      var mesh1 = new THREE.Mesh( sphere, material_sphere1 );
      mesh1.position.set( -250, 30, 0 );
      mesh1.scale.set( s, s, s );
      scene.add( mesh1 );
  
      var mesh2 = new THREE.Mesh( sphere, material_sphere2 );
      mesh2.position.set( 250, 30, 0 );
      mesh2.scale.set( s, s, s );
      scene.add( mesh2 );
  
      var material = new THREE.MeshLambertMaterial({ 
        color: 0x7f7566, 
        wireframe: true, 
        wireframeLinewidth: 1 
      });
  
      var url = "http://s.cdpn.io/43382/google_1.jpg",
          map = THREE.ImageUtils.loadTexture(url);
    
      var material = new THREE.MeshBasicMaterial({
        map: map,
        color: 0x7f7566, 
        wireframe: false, 
        wireframeLinewidth: 1 
      });

    
    
      
      var texture = THREE.ImageUtils.loadTexture( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/43382/stones.jpg' );
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 1000, 1000 );
    
     
    
      //the floor
      theFloor = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000, 1000, 1000 ), new THREE.MeshBasicMaterial({ map: texture}) );
      theFloor.position.y = -100;
      theFloor.rotation.x = - Math.PI / 2;
      //theFloor.side = THREE.DoubleSide;
      scene.add( theFloor );
  
      //left side
      leftWall = new THREE.Mesh( 
        new THREE.PlaneGeometry( 1000, 1000, 100, 100 ), material );
      leftWall.side = THREE.DoubleSide;
      leftWall.position.y =  400;
      leftWall.position.x = -500;
      leftWall.rotation.y = this.degra(90);
      scene.add( leftWall );
  
      //right side 
      rightWall = new THREE.Mesh( 
        new THREE.PlaneGeometry( 1000, 1000, 100, 100 ), material );
      rightWall.side = THREE.DoubleSide;
      rightWall.position.y =  400;
      rightWall.position.x =  500;
      rightWall.rotation.y =  - Math.PI / 2;
      scene.add( rightWall );
  
      //far side
      farWall = new THREE.Mesh( 
        new THREE.PlaneGeometry( 1000, 1000, 100, 100 ), material );
      farWall.side = THREE.DoubleSide;
      farWall.position.y =   400;
      farWall.position.x =   0;
      farWall.position.z =  -500;
      farWall.rotation.x = - this.degra(0);
      scene.add( farWall );
    
      //the near side
      nearWall = new THREE.Mesh( 
        new THREE.PlaneGeometry( 1000, 1000, 100, 100 ), material );
      nearWall.side = THREE.DoubleSide;
      nearWall.position.y =   400;
      nearWall.position.x =   0;
      nearWall.position.z =   500;
      nearWall.rotation.x = - this.degra(0);
      scene.add( nearWall );
  
   
  
      renderer = new THREE.WebGLRenderer({ 
        setClearColor: 0xFFFFFF, 
        antialias: true 
      });
    
      /*
      //renderer make shadows?
      renderer.shadowMapEnabled = true;
      renderer.shadowMapSoft = false;

      renderer.shadowCameraNear = 3;
      renderer.shadowCameraFar = camera.far;
      renderer.shadowCameraFov = 50;

      renderer.shadowMapBias = 0.0039;
      renderer.shadowMapDarkness = 0.5;
      renderer.shadowMapWidth = 1024;
      renderer.shadowMapHeight = 1024;
      */
    
      
    
      //point light
      //this.point_light = new THREE.PointLight( 0xFFFFFF, 20, 50 );
      //scene.add( this.point_light );
    
    /*
      this.point_light = new THREE.SpotLight( 0xffffff );
      this.point_light.position.set( 100, 1000, 100 );
    
      this.point_light.castShadow = true;
    
      this.point_light.shadowMapWidth = 1024;
      this.point_light.shadowMapHeight = 1024;
    
      this.point_light.shadowCameraNear = 500;
      this.point_light.shadowCameraFar = 4000;
      this.point_light.shadowCameraFov = 30;
    
      scene.add( this.point_light );
    
    
      this.point_sphere = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ) );
      this.point_sphere.position = this.point_light;
      scene.add( this.point_sphere );
    
    
    
    
    
      var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2 );
      hemiLight.position.set( 0, 500, 0 );
      scene.add( hemiLight );
    
    
    
    
      //cast shadow
      //light.castShadow = true;
      mesh1.castShadow = true;
      mesh2.castShadow = true;
    
    
      //recieve shadow?
      theFloor.castShadow = true;  
      theFloor.receiveShadow = true;
      */
    
      // Lights
      scene.add( new THREE.AmbientLight( 0xcccccc ) );
      
      /*
      var directionalLight = new THREE.DirectionalLight(0xeeeeee );
      directionalLight.position.x = Math.random() - 0.5;
      directionalLight.position.y = Math.random() - 0.5;
      directionalLight.position.z = Math.random() - 0.5;
      directionalLight.position.normalize();
      scene.add( directionalLight );
      */
    
      renderer.setSize( this.W, this.H );
      document.body.appendChild( renderer.domElement );
      window.addEventListener( 'resize', app.onWindowResize, false );
    
    
      this.scene = scene;
      app.controls = controls;
      this.camera = camera;
      this.renderer = renderer;
    
    },
    
    //wheer am i?
    currentPosition : function(){
      
      arr = app.controls.getPos();
      
      x = Math.round(arr.position.x);
      y = Math.round(arr.position.y);
      z = Math.round(arr.position.z);
      
      str = "Current Position: x:" + x + " y:" + y + " z:" + z;
      document.getElementById("position").innerHTML =  str;
      
    },
  
  
    //animation loop
    animate : function() {
      
      this.currentPosition();
      
      this.controls.isOnObject( false );
      this.controls.update( Date.now() - this.time );
      
      
      
      
      var items = [
        this.point_sphere,
        this.point_light
      ];
      
      items.forEach(function(entry) {
        
      try{
        
          obj = entry;
        
          obj.position.x = params.xpos;
          obj.position.y = params.ypos;
          obj.position.z = params.zpos;
      
          obj.rotation.x = app.degra(params.xrot);
          obj.rotation.y = app.degra(params.yrot);
          obj.rotation.z = app.degra(params.zrot);
        
          obj.distance = params.distance;
          obj.intensity = params.intensity;
          
        }catch(Excption){
        
        }
        
      });
      
      
      
      
      this.renderer.render( this.scene, this.camera );
      this.time = Date.now();
  },
  
  
  //window resize
  onWindowResize : function(){
      app.camera.aspect = window.innerWidth / window.innerHeight;
      app.camera.updateProjectionMatrix();
      app.renderer.setSize( window.innerWidth, window.innerHeight );
  },
  
  
  //annimation frame loop call
  loop : function(){
    app.animate();
    requestAnimationFrame( app.loop );  
  }
  
  
}



//dat gui control vars
var params = {
  
  xpos : 0,
  ypos : 0,
  zpos : 0,
    
  xrot : 0,
  yrot : 0,
  zrot : 0,
  
  intensity : 2,
  distance : 50
}


 



//run the app...
app.listener(); 
app.init(); 
app.loop();

}

window.onload = function () {
	//activate();
}

/*

//dat gui
var gui = new dat.GUI();

gui.add( params, 'xpos').name('X Position:').min(-400).max(400).step(1);
gui.add( params, 'ypos').name('Y Position:').min(-400).max(400).step(1);
gui.add( params, 'zpos').name('Z Position:').min(-400).max(400).step(1);

gui.add( params, 'xrot').name('X Rotation:').min(0).max(360).step(1);
gui.add( params, 'yrot').name('Y Rotation:').min(0).max(360).step(1);
gui.add( params, 'zrot').name('Z Rotation:').min(0).max(360).step(1);

gui.add( params, 'intensity').name('Intensity:').min(0).max(1000).step(1);
gui.add( params, 'distance').name('Distance:').min(0).max(1000).step(1);
*/
