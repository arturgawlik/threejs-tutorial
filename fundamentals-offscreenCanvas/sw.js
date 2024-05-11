import {
  BoxGeometry,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Mesh,
  DirectionalLight,
  MeshPhongMaterial,
  Color,
} from "three";

self.addEventListener("message", (e) => {
  const { canvas } = e.data;
  main(canvas);
});

function main(offscreenCanvas) {
  //   const canvas = document.getElementsByTagName("canvas")[0];
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas: offscreenCanvas,
  });

  const fov = 75;
  const aspect = 2; // canvas default
  const near = 0.1;
  const far = 5;
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new Scene();
  scene.background = new Color("pink");

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

  const color = 0xffffff;
  const intensity = 3;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);

  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ];

  scene.add(light);

  function makeInstance(geometry, color, x) {
    const material = new MeshPhongMaterial({ color });

    const cube = new Mesh(geometry, material);

    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  function render(time) {
    time *= 0.001; // convert to seconds

    cubes.forEach(rotate);

    renderer.render(scene, camera);

    function rotate(cube, ndx) {
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
