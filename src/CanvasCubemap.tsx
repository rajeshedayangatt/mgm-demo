import React, { useEffect } from "react";
import {
	Raycaster,
	Vector2,
	WebGLRenderer,
    PerspectiveCamera,
	Scene,
	Group,
	Mesh,
	PlaneGeometry,
	MeshBasicMaterial,
    Color,
    DirectionalLight,
    SphereGeometry,
    TextureLoader,
    MathUtils
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


export const CanvasCubemap = () => {

    let renderer : any ;
    let camera : any;
    let scene : any;
    let controls : any;


    useEffect( () => {

        initScene();
        animate();

    },[])

    const initScene = () => {

        renderer = new WebGLRenderer({ antialias: true, powerPreference: "high-performance"});
        renderer.setPixelRatio( window.devicePixelRatio );
        // renderer.setSize( window.innerWidth, window.innerHeight );
        let canvascontainer = document.getElementById('canvas-container');
        if (canvascontainer === null) {
            return false;
        } else{
            canvascontainer.appendChild(renderer.domElement);
        }

        if(canvascontainer) {
            renderer.setSize(canvascontainer.clientWidth,window.innerHeight);

        }

        camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
        scene = new Scene();
		camera.position.set(0, 0, 0.01);


        const geometry = new SphereGeometry( 500, 60, 40 );
        geometry.scale( - 1, 1, 1 );

        const texture = new TextureLoader().load( 'models/thermatru_tools_support.jpg' );
	    const material = new MeshBasicMaterial( { map: texture } );

        const mesh = new Mesh( geometry, material );
		scene.add( mesh );
		controls = new OrbitControls(camera,renderer.domElement);
        controls.enableDamping = true;
		controls.rotateSpeed = -0.25;
		controls.enablePan = false;
		controls.enableZoom = false;


		window.addEventListener( 'resize', onWindowResize );
    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );

    }

   

    function animate() {

        requestAnimationFrame( animate );
        update();

    }

    function update() {

        camera.lookAt( 0,0,0);
        controls.update();
        renderer.render( scene, camera );

    }

    return(

        <div>
            <div id="canvas-container"></div>
        </div>
    )

}


