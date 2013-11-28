(function () {
	"use strict"

  var WIDTH = 849,
      HEIGHT = 450,
      FOV = 45,
      ASPECT_RATIO = WIDTH / HEIGHT,
      MIN_VIEW_DISTANCE = 0.1,
      MAX_VIEW_DISTANCE = 10000,
      renderer = new THREE.WebGLRenderer(),
      camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, MIN_VIEW_DISTANCE, MAX_VIEW_DISTANCE),
      scene = new THREE.Scene();

  camera.position.x = 20;
  camera.position.y = -10;
  camera.position.z = 50;
  renderer.setSize(WIDTH, HEIGHT);

  /*
   * Begin temporary scene code
   */

  var vertexColorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true }),
      basicMaterial = new THREE.MeshBasicMaterial({ color: 0xdd0000 }),
      pointLight = new THREE.PointLight(0xFFFFFF);
  
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  var nV = 3;
  var nT = 2;
  var tiles = 50;
  var tile_size = 5;

  var geometry = new THREE.BufferGeometry();
  geometry.attributes = {
    position: {
      itemSize: 3,
      array: new Float32Array (tiles * nV * nT * 3)
    },
    normal: {
      itemSize: 3,
      array: new Float32Array (tiles * nV * nT * 3)
    },
    color: {
      itemSize: 3,
      array: new Float32Array (tiles * nV * nT * 3)
    }
  };

  var position_array = geometry.attributes.position.array,
      normal_array = geometry.attributes.normal.array,
      color_array = geometry.attributes.color.array;

  var tile_color = new THREE.Color(0xdd0000);
  var tile_color_darker =  new THREE.Color(0x550000);

  /*
   *   pA,D -   pF
   *   |    \   |
   *   pB   - pC,E
   */

  var pA = new THREE.Vector3();
  var pB = new THREE.Vector3();
  var pC = new THREE.Vector3();
  var pF = new THREE.Vector3();

  var cb = new THREE.Vector3();
  var ab = new THREE.Vector3();
  var fe = new THREE.Vector3();
  var de = new THREE.Vector3();

  for (var i = 0; i < tiles; i++) {
    var aX = (i % 10)*tile_size;
    var aY = Math.floor(i / 10) * (-1 * tile_size);
    var aZ = 0;

    var bX = (i % 10)*tile_size;
    var bY = (Math.floor(i / 10) * (-1 * tile_size)) - tile_size
    var bZ = 0;

    var cX = (i % 10)*tile_size + tile_size;
    var cY = (Math.floor(i / 10) * (-1 * tile_size)) - tile_size;
    var cZ = 0;

    var dX = (i % 10)*tile_size;
    var dY = Math.floor(i / 10) * (-1 * tile_size);
    var dZ = 0;

    var eX = (i % 10)*tile_size + tile_size;
    var eY = (Math.floor(i / 10) * (-1 * tile_size)) - tile_size;
    var eZ = 0;

    var fX = (i % 10)*tile_size + tile_size;
    var fY = Math.floor(i / 10) * (-1 * tile_size);
    var fZ = 0;


    position_array[i*nV*nT*3 + 0] = aX;
    position_array[i*nV*nT*3 + 1] = aY;
    position_array[i*nV*nT*3 + 2] = aZ;

    position_array[i*nV*nT*3 + 3] = bX;
    position_array[i*nV*nT*3 + 4] = bY;
    position_array[i*nV*nT*3 + 5] = bZ;

    position_array[i*nV*nT*3 + 6] = cX;
    position_array[i*nV*nT*3 + 7] = cY;
    position_array[i*nV*nT*3 + 8] = cZ;

    position_array[i*nV*nT*3 + 9] = dX;
    position_array[i*nV*nT*3 + 10] = dY;
    position_array[i*nV*nT*3 + 11] = dZ;

    position_array[i*nV*nT*3 + 12] = eX;
    position_array[i*nV*nT*3 + 13] = eY;
    position_array[i*nV*nT*3 + 14] = eZ;

    position_array[i*nV*nT*3 + 15] = fX;
    position_array[i*nV*nT*3 + 16] = fY;
    position_array[i*nV*nT*3 + 17] = fZ;


    pA.set(aX, aY, aZ);
    pB.set(bX, bY, bZ);
    pC.set(cX, cY, cZ);

    cb.subVectors(pC, pB);
    ab.subVectors(pA, pB);
    cb.cross(ab);
    cb.normalize();

    pF.set(fX, fY, fZ);

    fe.subVectors(pF, pC);
    de.subVectors(pA, pC);
    fe.cross(de);
    fe.normalize();

    var anx = cb.x;
    var any = cb.y;
    var anz = cb.z;

    var bnx = fe.x;
    var bny = fe.y;
    var bnz = fe.z;

    normal_array[i*nV*nT*3 + 0] = anx;
    normal_array[i*nV*nT*3 + 1] = any;
    normal_array[i*nV*nT*3 + 2] = anz;

    normal_array[i*nV*nT*3 + 3] = anx;
    normal_array[i*nV*nT*3 + 4] = any;
    normal_array[i*nV*nT*3 + 5] = anz;

    normal_array[i*nV*nT*3 + 6] = anx;
    normal_array[i*nV*nT*3 + 7] = any;
    normal_array[i*nV*nT*3 + 8] = anz;

    normal_array[i*nV*nT*3 + 9] = bnx;
    normal_array[i*nV*nT*3 + 10] = bny;
    normal_array[i*nV*nT*3 + 11] = bnz;

    normal_array[i*nV*nT*3 + 12] = bnx;
    normal_array[i*nV*nT*3 + 13] = bny;
    normal_array[i*nV*nT*3 + 14] = bnz;

    normal_array[i*nV*nT*3 + 15] = bnx;
    normal_array[i*nV*nT*3 + 16] = bny;
    normal_array[i*nV*nT*3 + 17] = bnz;


    color_array[i*nV*nT*3 + 0] = tile_color.r;
    color_array[i*nV*nT*3 + 1] = tile_color.g;
    color_array[i*nV*nT*3 + 2] = tile_color.b;

    color_array[i*nV*nT*3 + 3] = tile_color.r;
    color_array[i*nV*nT*3 + 4] = tile_color.g;
    color_array[i*nV*nT*3 + 5] = tile_color.b;

    color_array[i*nV*nT*3 + 6] = tile_color_darker.r;
    color_array[i*nV*nT*3 + 7] = tile_color_darker.g;
    color_array[i*nV*nT*3 + 8] = tile_color_darker.b;

    color_array[i*nV*nT*3 + 9] = tile_color.r;
    color_array[i*nV*nT*3 + 10] = tile_color.g;
    color_array[i*nV*nT*3 + 11] = tile_color.b;

    color_array[i*nV*nT*3 + 12] = tile_color_darker.r;
    color_array[i*nV*nT*3 + 13] = tile_color_darker.g;
    color_array[i*nV*nT*3 + 14] = tile_color_darker.b;

    color_array[i*nV*nT*3 + 15] = tile_color.r;
    color_array[i*nV*nT*3 + 16] = tile_color.g;
    color_array[i*nV*nT*3 + 17] = tile_color.b;
  }

  var tile_mesh = new THREE.Mesh(geometry, vertexColorMaterial);

  scene.add(tile_mesh);
  scene.add(pointLight);

  /*
   * End temporary scene code
   */

  $(document).ready(function () {
    $('.game-canvas').append(renderer.domElement);
    render();

    function render() {
      requestAnimationFrame(render);

      var time = Date.now() * 0.001;

      //tile_mesh.rotation.x = time * 0.25;
      //tile_mesh.rotation.y = time * 0.5;

      renderer.render(scene, camera);
    }
  });

}());
