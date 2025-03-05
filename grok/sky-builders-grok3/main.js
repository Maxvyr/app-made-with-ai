import * as THREE from "three";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("game-container").appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft overall light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Sun-like light
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Skybox
const skyboxLoader = new THREE.CubeTextureLoader();
const skyboxTexture = skyboxLoader.load([
  "assets/skybox/posx.jpeg",
  "assets/skybox/negx.jpeg",
  "assets/skybox/posy.jpeg",
  "assets/skybox/negy.jpeg",
  "assets/skybox/posz.jpeg",
  "assets/skybox/negz.jpeg",
]);
scene.background = skyboxTexture || new THREE.Color(0x87ceeb); // Fallback to blue if no skybox

// Grid of blocks
const gridSize = 10;
const blockSize = 1;
const blocks = {};
const textureLoader = new THREE.TextureLoader();
const blockTexture = textureLoader.load("assets/stone.png") || null;
const blockMaterial = new THREE.MeshStandardMaterial({
  map: blockTexture,
  color: blockTexture ? 0xffffff : 0xaaaaaa, // Use texture or fallback to gray
});

function addBlock(x, y, z) {
  const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
  const block = new THREE.Mesh(geometry, blockMaterial);
  block.position.set(x, y, z);
  scene.add(block);
  blocks[`${x},${y},${z}`] = block;
}

function removeBlock(x, y, z) {
  const key = `${x},${y},${z}`;
  if (blocks[key]) {
    scene.remove(blocks[key]);
    delete blocks[key];
  }
}

// Create a starting platform
for (let x = -2; x <= 2; x++) {
  for (let z = -2; z <= 2; z++) {
    addBlock(x, 0, z);
  }
}

// Floating particles
const particleCount = 50;
const particlesGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 20; // x
  positions[i + 1] = (Math.random() - 0.5) * 20; // y
  positions[i + 2] = (Math.random() - 0.5) * 20; // z
}
particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
const particles = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(particles);

// Camera setup
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// Raycaster for clicking
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Mouse controls
let isMouseDown = false;
let previousMouseX = 0;
let previousMouseY = 0;
const cameraSpeed = 0.1;
const rotationSpeed = 0.005;

// Click to add/remove blocks
window.addEventListener("mousedown", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children.filter((obj) => obj !== particles));

  if (intersects.length > 0) {
    const intersect = intersects[0];
    const pos = intersect.object.position;
    if (event.button === 0) {
      // Left click: add block
      addBlock(pos.x, pos.y + blockSize, pos.z);
    } else if (event.button === 2) {
      // Right click: remove block
      removeBlock(pos.x, pos.y, pos.z);
    }
  }

  if (event.button === 0) {
    isMouseDown = true;
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
  }
});

window.addEventListener("mouseup", (event) => {
  if (event.button === 0) isMouseDown = false;
});

window.addEventListener("mousemove", (event) => {
  if (isMouseDown) {
    const deltaX = event.clientX - previousMouseX;
    const deltaY = event.clientY - previousMouseY;
    camera.rotation.y -= deltaX * rotationSpeed;
    camera.rotation.x -= deltaY * rotationSpeed;
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    previousMouseX = event.clientX;
    previousMouseY = event.clientY;
  }
});

window.addEventListener("contextmenu", (event) => event.preventDefault());

// WASD movement
const keys = {};
window.addEventListener("keydown", (event) => {
  keys[event.key.toLowerCase()] = true;
});
window.addEventListener("keyup", (event) => {
  keys[event.key.toLowerCase()] = false;
});

function updateCamera() {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  const sideDirection = new THREE.Vector3();
  sideDirection.crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize();

  if (keys["w"]) camera.position.addScaledVector(direction, cameraSpeed);
  if (keys["s"]) camera.position.addScaledVector(direction, -cameraSpeed);
  if (keys["a"]) camera.position.addScaledVector(sideDirection, -cameraSpeed);
  if (keys["d"]) camera.position.addScaledVector(sideDirection, cameraSpeed);
}

// Animate particles
function updateParticles() {
  const positions = particles.geometry.attributes.position.array;
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i + 1] += 0.01; // Slowly rise
    if (positions[i + 1] > 10) positions[i + 1] = -10; // Reset if too high
  }
  particles.geometry.attributes.position.needsUpdate = true;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  updateCamera();
  updateParticles();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
