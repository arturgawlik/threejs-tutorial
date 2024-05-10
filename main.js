import {
  BoxGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
} from "three";

function main() {
  const canvas = document.getElementsByTagName("canvas")[0];
  const renderer = new WebGLRenderer({ antialias: true, canvas });

  const fov = 75;
  const aspect = 2; // canvas default
  const near = 0.1;
  const far = 5;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new MeshBasicMaterial({ color: 0x44aa88 });

  const cube = new Mesh(geometry, material);
  scene.add(cube);

  function render(time) {
    time *= 0.001; // convert to seconds

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
