"use strict";

var scene, dummy, dummyBuffer, camera, renderer;

var N = 10;

window.onload = function() {

    dummy = new THREE.Object3D();
    dummyBuffer = new THREE.Object3D();

    var renderCanvas = document.getElementById("render-canvas");
    renderCanvas.width = window.innerWidth;
    renderCanvas.height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({
        canvas: renderCanvas
    });
    renderer.setClearColor(0x555555);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 1000);
    camera.position.set(0, 0, N * 2);

    var material = new THREE.MeshBasicMaterial({
        color: 0x0088ff,
        side: THREE.DoubleSide
    });

    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            for (var k = 0; k < N; k++) {
                var geometry = randomGeometry();
                var mesh = new THREE.Mesh(geometry.geometry, material);
                mesh.position.set(i - N / 2, j - N / 2, k - N / 2);
                dummy.add(mesh);
                var mesh = new THREE.Mesh(geometry.bufferGeometry, material);
                mesh.position.set(i - N / 2, j - N / 2, k - N / 2);
                dummyBuffer.add(mesh);
            }
        }
    }

    animate();
};

function randomGeometry() {
    var position = [];
    for (var i = 0; i < 3; i++) {
        position.push(Math.random() * 2 - 1);
        position.push(Math.random() * 2 - 1);
        position.push(Math.random() * 2 - 1);
    }

    var bg = new THREE.BufferGeometry();
    bg.addAttribute('position', new THREE.BufferAttribute(new Float32Array(position), 3));

    var g = new THREE.Geometry();
    g.vertices.push(
        new THREE.Vector3(position[0], position[1], position[2]),
        new THREE.Vector3(position[3], position[4], position[5]),
        new THREE.Vector3(position[6], position[7], position[8])
    )
    g.faces.push(new THREE.Face3(0, 1, 2));
    return {
        geometry: g,
        bufferGeometry: bg
    };
}

function animate() {
    scene.remove(dummy);
    scene.remove(dummyBuffer);
    if (document.getElementById("use-buffer-geometry").checked) {
        scene.add(dummyBuffer);
    } else {
        scene.add(dummy);
    }
    dummy.rotation.x += 0.02;
    dummy.rotation.y += 0.01;
    dummyBuffer.rotation.x += 0.02;
    dummyBuffer.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}