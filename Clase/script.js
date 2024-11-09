let scene, camera, renderer, controller, model;

function init() {
    // Crear la escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 100);

    // Configurar el renderizador y habilitar WebXR
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Agregar el botón de AR proporcionado por Three.js
    document.body.appendChild(THREE.ARButton.createButton(renderer));

    // Cargar el modelo STL
    const loader = new THREE.STLLoader();
    loader.load(
        './Imagenes/truper1.stl', // Asegúrate de que el archivo STL esté en esta ruta
        (geometry) => {
            const material = new THREE.MeshNormalMaterial(); // Usa un material básico para el modelo
            model = new THREE.Mesh(geometry, material);
            model.scale.set(0.05, 0.05, 0.05); // Ajusta la escala según sea necesario
            model.rotation.x = -Math.PI / 2;  // Orienta el modelo si es necesario
            scene.add(model);
        },
        undefined,
        (error) => console.error("Error al cargar el archivo STL:", error)
    );

    // Configurar el controlador para AR
    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    animate();
}

function onSelect() {
    // Colocar el modelo en la posición del controlador
    if (model) {
        model.position.setFromMatrixPosition(controller.matrixWorld);
        model.visible = true;
    }
}

function animate() {
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}

init();
