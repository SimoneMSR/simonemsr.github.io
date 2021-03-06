  // once everything is loaded, we run our Three.js stuff.
  function init() {

    var app= {
		  //needed for scene
      camera : null,
      controls : null,
      scene : null,
      light : null,
      time : Date.now(),
      renderer : null,


      cylinder : null,


  //bits and pieces
  //blocker : document.getElementById( 'blocker' ),
  instructions : document.getElementById( 'instructions' ),
  element : document.body,
  loop : function(){
    app.animate();
 
  },
  //animation loop
  animate : function() {


    //app.controls.isOnObject( false );
    app.controls.update( Date.now() - this.time );
    webGLRenderer.render(app.scene, app.camera);
        requestAnimationFrame( app.loop ); 
  },
  pointerlockchange : function ( event ) {

    havePointerLock = 'pointerLockElement' in document 
    || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    if ( havePointerLock ) {

      if ( document.pointerLockElement === app.element || 
       document.mozPointerLockElement === app.element || 
       document.webkitPointerLockElement === app.element ) {

        app.controls.enabled = true;
      app.blocker.style.display = 'none';

    } else {

     app.controls.enabled = false;
     app.blocker.style.display = '-webkit-box';
     app.blocker.style.display = '-moz-box';
     app.blocker.style.display = 'box';
     app.instructions.style.display = '';

   }

 }
},

initializePointerBlock : function() {
  app.instructions.addEventListener( 'click', function ( event ) {

    this.style.display = 'none';

		      // Ask the browser to lock the pointer
		      app.element.requestPointerLock = app.element.requestPointerLock || app.element.mozRequestPointerLock ||
          app.element.webkitRequestPointerLock;

          if ( /Firefox/i.test( navigator.userAgent ) ) {

          } else {

           app.element.requestPointerLock();
         }

       }, false );
},


  //pointer lock error  
  pointerlockerror : function ( event ) {
    app.instructions.style.display = '';
  }
};
document.addEventListener( 'pointerlockchange', app.pointerlockchange, false );
document.addEventListener( 'mozpointerlockchange', app.pointerlockchange, false );
document.addEventListener( 'webkitpointerlockchange', app.pointerlockchange, false );

document.addEventListener( 'pointerlockerror', app.pointerlockerror, false );
document.addEventListener( 'mozpointerlockerror', app.pointerlockerror, false );
document.addEventListener( 'webkitpointerlockerror', app.pointerlockerror, false );

var stats = initStats();

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        app.scene = new THREE.Scene();



        // create a camera, which defines where we're looking at.
        app.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        //app.controls = new THREE.PointerLockControls( app.camera );
        app.controls = new THREE.TrackballControls( app.camera );

        app.controls.rotateSpeed = 2.0;
        app.controls.zoomSpeed = 1.2;
        app.controls.panSpeed = 0.8;
        app.controls.noZoom = false;
        app.controls.noPan = false;
        app.controls.staticMoving = true;
        app.controls.dynamicDampingFactor = 0.3;
        app.controls.keys = [ 65, 83, 68 ];
        app.controls.addEventListener( 'change', render );

        app.scene.add( app.controls.object );

        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMapEnabled = true;

        // position and point the camera to the center of the scene
        app.camera.position.x = 10;
        app.camera.position.y = 10;
        app.camera.position.z = 10;
        app.camera.lookAt(new THREE.Vector3(0, -2, 0));

        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(20, 20, 20);
        app.scene.add(spotLight);

        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

        // call the render function
        var step = 0;

          var group;
          var gui = new dat.GUI();


          var loader = new THREE.PLYLoader();
          var group = new THREE.Object3D();
          loader.load("./test.ply", function (geometry) {
            var material = new THREE.PointCloudMaterial({
              color: 0xffffff,
              size: 0.4,
              opacity: 0.6,
              transparent: true,
              blending: THREE.AdditiveBlending,
              map: generateSprite()
            });

            group = new THREE.PointCloud(geometry, material);
            group.sortParticles = true;

            app.scene.add(group);
          });

          //app.initializePointerBlock();
          app.loop();

        // from THREE.js examples
        function generateSprite() {

          var canvas = document.createElement('canvas');
          canvas.width = 16;
          canvas.height = 16;

          var context = canvas.getContext('2d');
          var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
          gradient.addColorStop(0, 'rgba(255,255,255,1)');
          gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
          gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
          gradient.addColorStop(1, 'rgba(0,0,0,1)');

          context.fillStyle = gradient;
          context.fillRect(0, 0, canvas.width, canvas.height);

          var texture = new THREE.Texture(canvas);
          texture.needsUpdate = true;
          return texture;

        }

        function render() {
          stats.update();

          if (group) {
                // group.rotation.y+=0.006;
                group.rotation.y += 0.006;
//                if (group.geometry) {
//                    group.geometry.vertices.forEach(function(v) {
////                        var scale = 1.001 + Math.random()/100;
//                        var sMatrix = new THREE.Matrix3(1.001 + Math.random()/100,0,0,
//                                0,1.001 + Math.random()/100,0,
//                                0,0,1.001 + Math.random()/100);
//                        v.applyMatrix3(sMatrix);
//                    })
//                }
}


            // render using requestAnimationFrame
            //requestAnimationFrame(render);
          }

          function initStats() {

            var stats = new Stats();
            stats.setMode(0); // 0: fps, 1: ms

            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';

            document.getElementById("Stats-output").appendChild(stats.domElement);

            return stats;
          }
        }
        window.onload = init;