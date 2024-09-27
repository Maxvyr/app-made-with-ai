<script>
  import { onMount } from 'svelte';

  let canvas;
  let ctx;
  let color = '#000000';
  let isDrawing = false;

  onMount(() => {
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  function startDrawing(e) {
    isDrawing = true;
    draw(e);
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / 10) * 10;
    const y = Math.floor((e.clientY - rect.top) / 10) * 10;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 10);
  }
</script>

<main>
  <h1>Pixel Art Editor</h1>
  <input type="color" bind:value={color} />
  <canvas
    bind:this={canvas}
    width={500}
    height={500}
    on:mousedown={startDrawing}
    on:mousemove={draw}
    on:mouseup={stopDrawing}
    on:mouseout={stopDrawing}
  ></canvas>
</main>

<style>
  canvas {
    border: 1px solid black;
  }
</style>