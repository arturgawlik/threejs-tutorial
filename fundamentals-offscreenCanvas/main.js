const canvas = document.getElementsByTagName("canvas")[0];
const offscreenCanvas = canvas.transferControlToOffscreen();

const worker = new Worker(new URL("sw.js", import.meta.url), {
  type: "module",
});

worker.postMessage({ canvas: offscreenCanvas }, [offscreenCanvas]);
