// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set a sky background color
scene.background = new THREE.Color(0x87ceeb); // Light blue sky

// Add a ground plane (your sky platform)
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x228b22 }); // Greenish color
const ground = new THREE.Mesh(planeGeometry, planeMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Create a basic player (a simple cube)
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const player = new THREE.Mesh(cubeGeometry, cubeMaterial);
player.position.set(0, 1, 0); // Raise the cube above the ground
scene.add(player);

// Position the camera
camera.position.set(0, 5, 10);
camera.lookAt(player.position);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Adjust scene on window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Basic movement controls for the player using keyboard
const speed = 0.2;
document.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "ArrowUp":
    case "KeyW":
      player.position.z -= speed;
      break;
    case "ArrowDown":
    case "KeyS":
      player.position.z += speed;
      break;
    case "ArrowLeft":
    case "KeyA":
      player.position.x -= speed;
      break;
    case "ArrowRight":
    case "KeyD":
      player.position.x += speed;
      break;
  }
});

// Implement building mechanics using raycaster on mouse click
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  // Convert mouse coordinates to normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const intersect = intersects[0];
    // Create a new block to add to the scene
    const blockGeometry = new THREE.BoxGeometry(1, 1, 1);
    const blockMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
    const block = new THREE.Mesh(blockGeometry, blockMaterial);

    // Position the block at the intersection point adjusted by the face normal
    block.position.copy(intersect.point).add(intersect.face.normal);
    block.position.divideScalar(1).floor().multiplyScalar(1).addScalar(0.5);
    scene.add(block);
  }
});
