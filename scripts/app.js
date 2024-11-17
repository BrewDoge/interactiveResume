window.addEventListener('DOMContentLoaded', function() {
    // Get the canvas element
    var canvas = document.getElementById("renderCanvas");

    // Create BabylonJS engine and scene
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    // // Create the camera and set it to follow the vehicle from behind
    // var camera = new BABYLON.FollowCamera("FollowCamera", new BABYLON.Vector3(0, 5, -10), scene);
    // camera.attachControl(canvas, true); // Attach camera to canvas for mouse/keyboard control
    // camera.radius = 10;  // Set the distance behind the vehicle
    // camera.heightOffset = 5;  // Set the height of the camera from the vehicle
    // camera.rotationOffset = 180; // Optional: adjust camera rotation


    // Camera
    var camera = new BABYLON.FollowCamera("FollowCamera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.9;
    camera.lowerRadiusLimit = 50;
    camera.upperRadiusLimit = 100;
    camera.attachControl(canvas, true);



    // Create a light source
    var light = new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);
    light.intensity = 0.7;



    // // Ground
    // var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    // groundMaterial.diffuseTexture = new BABYLON.Texture("earth.jpg", scene);

    // var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "worldHeightMap.jpg", 2000, 2000, 2500, 0, 10, scene, false);
    // ground.material = groundMaterial;

    var ground = new BABYLON.MeshBuilder.CreateGround("ground"); //scene is optional and defaults to the current scene
    ground.diffuseTexture = new BABYLON.diffuseTexture("earth.jpg")







    // Create the vehicle (a simple box for now)
    var vehicle = createPinMarker(scene);
    vehicle.position.y = 1;  // Lift the vehicle above the ground

    // Set up the camera to follow the vehicle
    camera.lockedTarget = vehicle;

    // Movement settings
    var speed = 0.2;  // Vehicle speed

    // Listen to keyboard events to move the vehicle
    var moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;

    window.addEventListener("keydown", function(event) {
        if (event.key === "w" || event.key === "ArrowUp") moveForward = true;
        if (event.key === "s" || event.key === "ArrowDown") moveBackward = true;
        if (event.key === "a" || event.key === "ArrowLeft") moveLeft = true;
        if (event.key === "d" || event.key === "ArrowRight") moveRight = true;
    });

    window.addEventListener("keyup", function(event) {
        if (event.key === "w" || event.key === "ArrowUp") moveForward = false;
        if (event.key === "s" || event.key === "ArrowDown") moveBackward = false;
        if (event.key === "a" || event.key === "ArrowLeft") moveLeft = false;
        if (event.key === "d" || event.key === "ArrowRight") moveRight = false;
    });

    // Update the vehicle position on each frame
    scene.registerBeforeRender(function() {
        // Get the camera's forward and right directions (relative to the camera's perspective)
        var forwardDirection = camera.getDirection(BABYLON.Axis.Z); // Camera's forward direction (Z axis)
        var rightDirection = camera.getDirection(BABYLON.Axis.X); // Camera's right direction (X axis)

        // Normalize the vectors to ensure consistent movement
        forwardDirection.y = 0; // Keep movement on the XZ plane
        forwardDirection.normalize();
        rightDirection.y = 0;
        rightDirection.normalize();

        // Apply movement based on the camera's direction
        if (moveForward) {
            vehicle.position.addInPlace(forwardDirection.scale(speed));
        }
        if (moveBackward) {
            vehicle.position.subtractInPlace(forwardDirection.scale(speed));
        }
        if (moveLeft) {
            vehicle.position.subtractInPlace(rightDirection.scale(speed));
        }
        if (moveRight) {
            vehicle.position.addInPlace(rightDirection.scale(speed));
        }
        
    });

    // Render loop
    engine.runRenderLoop(function() {
        scene.render();
    });

    // Resize the canvas when the window is resized
    window.addEventListener('resize', function() {
        engine.resize();
    });


// Function to create a simple pin marker (cylinder)
function createPinMarker(scene) {
    // Create a simple pin marker using a cylinder
    var pinMarker = BABYLON.MeshBuilder.CreateCylinder("pinMarker", {diameter: 1, height: 2}, scene);
    pinMarker.position.y = 1;  // Lift the marker slightly above the ground for visibility

    // Optionally, add material to the marker to distinguish it
    var pinMaterial = new BABYLON.StandardMaterial("pinMaterial", scene);
    pinMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);  // Red pin
    pinMarker.material = pinMaterial;

    return pinMarker;
}

});
