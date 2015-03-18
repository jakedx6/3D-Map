 // Get the canvas element from our HTML below
      var canvas = document.getElementById("renderCanvas");

      // Load the BABYLON 3D engine
      var engine = new BABYLON.Engine(canvas, true);

      // -------------------------------------------------------------
      // Here begins a function that we will 'call' just after it's built
      var createScene = function () {

         // Now create a basic Babylon Scene object
         var scene = new BABYLON.Scene(engine);

         // This creates and positions a free camera
         var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 200, -325), scene);

         // This targets the camera to scene origin
         camera.setTarget(new BABYLON.Vector3.Zero());

         // This attaches the camera to the canvas
         camera.attachControl(canvas, false);

          //mat
          var groundmat = new BABYLON.StandardMaterial("texture1", scene);
            groundmat.wireframe = true;
            groundmat.specularPower = 32;
          
          var erutex = new BABYLON.StandardMaterial("texture2", scene);
            erutex.diffuseTexture = new BABYLON.Texture("hm.jpg", scene);
            erutex.alpha = 0.8;
            erutex.specularPower = 32;
          
          var bluePlaneMat = new BABYLON.StandardMaterial("texture3", scene); 
              bluePlaneMat.emissiveColor = new BABYLON.Color3(0, 0, 0);
              
          
         // This creates a light, aiming 0,1,0 - to the sky.
         var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(5, 200, 0), scene);

         // Dim the light a small amount
         light.intensity = .6;

          var plane = BABYLON.Mesh.CreatePlane("groundPlane", 250.0, scene);
          
          var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "hm.jpg", 250, 250, 250, 30, 10, scene, false);
          
         // var ground2 = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "hm.jpg", 250, 250, 250, 30, 10, scene, false);
          
        
         // ground2.position.y = -.2;
          plane.position.y = 20;
          plane.rotation.x = Math.PI/2;
          plane.material = bluePlaneMat;
         // ground2.material = groundmat;
          ground.material = erutex;
          
          
          
          var camerasBorderFunction = function () {
        //Angle
        if (camera.beta < 0.1)
            camera.beta = 0.1;
        else if (camera.beta > (Math.PI / 2) * 0.9)
            camera.beta = (Math.PI / 2) * 0.9;

  //Zoom
        if (camera.radius > 150)
            camera.radius = 150;

        if (camera.radius < 30)
            camera.radius = 30;
    };

    scene.registerBeforeRender(camerasBorderFunction);

    
          
         // Leave this function
         return scene;

      };  // End of createScene function
      // -------------------------------------------------------------

      // Now, call the createScene function that you just finished creating
      var scene = createScene();

      // Register a render loop to repeatedly render the scene
      engine.runRenderLoop(function () {
         scene.render();
      });

      // Watch for browser/canvas resize events
      window.addEventListener("resize", function () {
         engine.resize();
      });