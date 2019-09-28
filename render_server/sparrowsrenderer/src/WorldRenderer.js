import React, { Component } from 'react';
import * as THREE from 'three';

import logoObj from './assets/ChickenWings.obj';
import logoMat from './assets/ChickenWings.mtl'
import OBJLoader from 'three-obj-loader';
import MTTLoader from 'three-mtl-loader';
import { Math, Vector3 } from 'three';

OBJLoader(THREE);


class WorldRenderer extends Component {


    componentDidMount() {
        this.then = 0;
        this.animDirection = 1;
        this.THREE = THREE;
        const width = window.innerWidth
        const height = window.innerHeight
        //ADD SCENE
        this.scene = new THREE.Scene()
        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        )
        this.camera.position.z = 8
        this.camera.position.y = 4;
        this.camera.rotateOnWorldAxis(new Vector3(1, 0, 0), Math.degToRad(-20))
        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setClearColor(0x000000, 0)
        this.renderer.setSize(width, height)
        this.mount.appendChild(this.renderer.domElement)
        //ADD CUBE
        var sceneRef = this.scene;
        const mtlLoader = new MTTLoader();
        mtlLoader.load(logoMat, materials => {
            materials.preload();
            const loader = new this.THREE.OBJLoader();
            this.materials = materials;
            loader.setMaterials(materials);
            loader.load(logoObj, object => {
                this.object = object;
                this.object.rotateOnWorldAxis(new Vector3(0, 1, 0), Math.degToRad(-90))
                this.object.position.set(0,-1,0)
                this.object.scale.set(1.4,1.4,1.4)
                sceneRef.add(object);
            })
        });
        var axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);

        var directLightR = new THREE.DirectionalLight(0xeabe85, 2);
        directLightR.position.z = 15;
        directLightR.position.y = 15;
        directLightR.position.x = 15;
        directLightR.rotateOnWorldAxis(new Vector3(1,0,0), Math.degToRad(45))
        directLightR.rotateOnWorldAxis(new Vector3(0,1,0), Math.degToRad(45))
        this.scene.add(new THREE.DirectionalLightHelper(directLightR, 1))
        this.scene.add(directLightR);

        var directLightM = new THREE.DirectionalLight(0xffffff, 3);
        directLightM.position.z = 15;
        directLightM.position.y = 15;
        directLightM.rotateOnWorldAxis(new Vector3(1,0,0), Math.degToRad(45))
        this.scene.add(new THREE.DirectionalLightHelper(directLightM, 1))
        this.scene.add(directLightM);

        var directLightL = new THREE.DirectionalLight(0x81bbea, 2);
        directLightL.position.z = 15;
        directLightL.position.y = 15;
        directLightL.position.x = -15;
        directLightL.rotateOnWorldAxis(new Vector3(1,0,0), Math.degToRad(45))
        directLightL.rotateOnWorldAxis(new Vector3(0,1,0), Math.degToRad(-45))
        this.scene.add(new THREE.DirectionalLightHelper(directLightL, 1))
        this.scene.add(directLightL);

        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = (now) => {
        this.now *= 0.001;
        const delta = now - this.then;
        this.then = now;

        // Need rework later on
        if (this.object !== undefined) {
            this.object.rotation.y += 0.0001 * delta * this.animDirection;
            if((this.animDirection === 1 && this.object.rotation.y > Math.degToRad(-70))
                || (this.animDirection === -1 && this.object.rotation.y < Math.degToRad(-110))){
                    this.animDirection *= -1;
                }
        }
        
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene = () => {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                style={{ width: '1520px', height: '680px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default WorldRenderer