window.addEventListener('DOMContentLoaded', function() {
    // Get the canvas element
    var canvas = document.getElementById("renderCanvas");

    // Create BabylonJS engine and scene
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);






    // Light
    var spot = new BABYLON.PointLight("spot", new BABYLON.Vector3(0, 30, 10), scene);
    spot.diffuse = new BABYLON.Color3(1, 1, 1);
    spot.specular = new BABYLON.Color3(0, 0, 0);

    // Camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 150;
    camera.attachControl(canvas, true);

    // Ground
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("../textures/earth.jpg", scene);

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../textures/worldHeightMap.jpg", 200, 200, 250, 0, 10, scene, false);
    ground.material = groundMaterial;


    var newGround = new BABYLON.StandardMaterial("ground",scene)

    //Sphere to see the light's position
    var sun = BABYLON.Mesh.CreateSphere("sun", 10, 4, scene);
    sun.material = new BABYLON.StandardMaterial("sun", scene);
    sun.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

    //Sun animation
    scene.registerBeforeRender(function () {
        sun.position = spot.position;
        spot.position.x -= 0.5;
        if (spot.position.x < -90)
            spot.position.x = 100;
    });


});