(function () {
	"use strict"

  var WIDTH = 970,
      HEIGHT = 450,
      FOV = 45,
      ASPECT_RATIO = WIDTH / HEIGHT,
      MIN_VIEW_DISTANCE = 0.1,
      MAX_VIEW_DISTANCE = 10000,
      renderer = new THREE.WebGLRenderer(),
      camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, MIN_VIEW_DISTANCE, MAX_VIEW_DISTANCE),
      scene = new THREE.Scene();

  scene.add(camera);
  camera.position.z = 300;
  renderer.setSize(WIDTH, HEIGHT);

  /*
   * Begin temporary scene code
   */

  var radius = 50,
      segments = 16,
      rings = 16,
      basicMaterial = new THREE.MeshLambertMaterial(
        {
          color: 0xCC0000
        }
      ),
      box = new THREE.Mesh(
        new THREE.CubeGeometry(
          100,
          100,
          1
        ),
        basicMaterial
      ),
      pointLight = new THREE.PointLight(0xFFFFFF);
  
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  scene.add(box);
  scene.add(pointLight);

  /*
   * End temporary scene code
   */

  $(document).ready(function () {
    $('.game-canvas').append(renderer.domElement);
    renderer.render(scene, camera);
  });

}());