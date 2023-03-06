import React from "react";
import {
	Raycaster,
	Vector2,
	WebGLRenderer,
    OrthographicCamera,
	Scene,
	Group,
	Mesh,
	PlaneGeometry,
	MeshBasicMaterial,
    Color,
    DirectionalLight
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from "gsap";



type myProps = {
    changecube : () => void
}

const animateObjArray = ["Packaged","Entrance","Produce","Electronics","Clothing"];

export default class Canvas extends React.Component<myProps> {


    scene: any | undefined;
    renderer: any | undefined;
    camera: any | undefined;
    totalGroup: any | undefined;
    controls: any | undefined;
    ambientLight: any | undefined;
    pointer:any  = new Vector2();
    raycaster:any = new Raycaster();
    INTERSECTED:any = null;
    hotMeshArr : any = [];
    previousObject : any = null;


    constructor(props: myProps) {
        super(props)
    }

    componentDidMount(): void {
        this.initScene();
    }

    public initScene(): any {

		this.renderer = new WebGLRenderer({ antialias: true, powerPreference: "high-performance"});

        let canvascontainer = document.getElementById('canvas-container');


        const frustumSize = 1000;
        const aspect = window.innerWidth / window.innerHeight;

        this.camera = new OrthographicCamera( frustumSize * aspect / - 15, frustumSize * aspect / 15, frustumSize / 15, frustumSize / - 15, 1, 1000 );

		// this.camera = new OrthographicCamera( -200, 200,200, -200, .03, 1000 );
        this.camera.position.set(-320, 291.54, 409.38)
        this.camera.rotation.set(1.2, -0.33, 0.7)

        this.scene = new Scene();        
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // this.renderer.setSize(window.innerWidth, window.innerHeight);

        if(canvascontainer) {
            this.renderer.setSize(canvascontainer.clientWidth,window.innerHeight);

        }

        this.renderer.render(this.scene, this.camera);
        this.renderer.setAnimationLoop(() => this.animate()); // uncomment if you want to use the animation loop

		if (canvascontainer === null) {
            return false;
        } else{
            canvascontainer.appendChild(this.renderer.domElement);
        }


		this.totalGroup = new Group();

		// let ambientLight = new AmbientLight(0xffffff);
		// this.scene.add(ambientLight);

        const light = new DirectionalLight( 0xffffff, 2 );
        light.position.set( -12.65, 42.87, 100.53 );
        light.rotation.set(  0.87, 0.89, 0.05 );
        this.scene.add( light );


        const light2 = new DirectionalLight( 0xffffff, 2 );
        light2.position.set( -12.65, 15.53, 121.43);
        light2.rotation.set(  1.08, 0.92, 0.4 );
        this.scene.add( light2 );

		// this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.update();

        this.scene.add(this.totalGroup);

        // let planemesh = this.addPlaneToScene();

        // this.scene.add(planemesh);


        this.addModalToScene();


        window.addEventListener("resize", () => this.onResize());

        window.addEventListener( 'pointermove', (e) => this.onPointerMove(e) ,false);
        document.addEventListener( 'click', (e) => this.onClick(e) , false);


    }
    
    onClick (event: MouseEvent) {


        if(this.pointer !== undefined){


            this.raycaster.setFromCamera( this.pointer, this.camera );
            const intersects = this.raycaster.intersectObjects(this.totalGroup.children,true);
            if ( intersects.length > 0 ) {

                if(animateObjArray.includes(intersects[ 0 ].object.name)) {

                    this.props.changecube()
                }

                console.log(intersects[ 0 ].object)

            }

        }

    }
    onPointerMove(event: MouseEvent) {

        if(this.pointer !== undefined){

            this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        }


    }

    public onResize() {


        if(this.renderer !== undefined && this.scene !== undefined && this.camera !== undefined) {

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth , window.innerHeight);
        }

    }

    addModalToScene() {

        const loader = new GLTFLoader();

        loader.load( 'models/retail-map.glb',  ( gltf ) => {

            // gltf.scene.scale.set(5,5,5)
            this.totalGroup.add( gltf.scene );
            this.hotMeshArr.push(gltf.scene);

        }, undefined, function ( error ) {
        
            console.error( error );
        
        });
    }

    addPlaneToScene() {

        const geometry = new PlaneGeometry( 1, 1 );
        const material = new MeshBasicMaterial( {color: "red", side: 2} );
        const plane = new Mesh( geometry, material );
        return plane;

    }

    async animate () {

        if(this.renderer !== undefined && this.scene !== undefined && this.camera !== undefined) {
            this.renderer.render(this.scene, this.camera);
            this.camera.lookAt(this.scene.position);
            this.camera.updateMatrixWorld();

            this.raycaster.setFromCamera( this.pointer, this.camera );
            const intersects = this.raycaster.intersectObjects(this.totalGroup.children,true);


            if ( intersects.length > 0 ) {
                

                    if(animateObjArray.includes(intersects[ 0 ].object.name)) {

                        document.body.style.cursor = 'pointer'

                        if ( this.INTERSECTED != intersects[ 0 ].object ) {
                            if ( this.INTERSECTED ) {
    
                                this.INTERSECTED.material.color = new Color( "#fff"  );
                                gsap.to(this.INTERSECTED.position, { duration: 1, y: 0 });
    
                            };
    
                            if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
                            this.INTERSECTED = intersects[ 0 ].object;
                            this.INTERSECTED.currentHex = this.INTERSECTED.material.color;
                            this.INTERSECTED.material.color = new Color( "red" );
                            gsap.to(this.INTERSECTED.position, { duration: 1, y: 5 });
                            this.previousObject = intersects[0].object;
    
                        }
    
    
                        if(this.INTERSECTED != this.previousObject){
                            this.previousObject.material.color = new Color( this.previousObject.currentHex  );
                        }
    
    
                    }

                 

            }else{

                document.body.style.cursor = 'default'
                if ( this.INTERSECTED ) {

                    this.INTERSECTED.material.color = new Color( "#fff"  );
                    gsap.to(this.INTERSECTED.position, { duration: 1, y: 0 });

                };

                this.INTERSECTED = null;
            }

      
        }
    }


    render() {

        return(
            <div>
              
                    <div className="heading"><h1>SELECT A ROOM</h1></div>
                    <div id="canvas-container"></div>
              
            </div>
        )
    }

}