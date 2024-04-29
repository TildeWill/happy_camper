import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import {FontLoader} from "three/addons";
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // add the renderer to html


camera.position.z = 900;

const loader = new FontLoader();
let textObj;
let mesh;
loader.load('./fonts/helvetiker_regular.typeface.json', function (font) {
    // TextGeometry(String, Object)
    textObj = new TextGeometry('W7%', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 100,
    });
    const material = new THREE.MeshBasicMaterial({color: 'red'});
    mesh = new THREE.Mesh(textObj, material);
    scene.add(mesh);
});


function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);

}

animate();

function save( blob, filename ) {
    link.href = URL.createObjectURL( blob );
    link.download = filename;
    link.click();
}
function saveArrayBuffer( buffer, filename ) {
    save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
}

// Instantiate an exporter
const exporter = new STLExporter();

// Configure export options
const options = { binary: true }

// Parse the input and generate the STL encoded output

const result = exporter.parse( mesh, { binary: true } );
saveArrayBuffer( result, 'box.stl' );