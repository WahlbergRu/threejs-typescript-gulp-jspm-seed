///<reference path="../../../typings/tsd.d.ts"/>;
import * as THREE from 'three';
import {Game, IComponent} from 'app/game/game';

export default class Cloud implements IComponent {

	private mesh : THREE.Mesh;

	constructor() {

        var geometry,
            material,
            sphere,
            cloud,
            mapSize = 70,
            cloudSize = 3,
            cloudWide = 3;

        //Make array of cloud
        cloud =  Array.from({length: cloudWide},
                ()=> Array.from({length: cloudSize},
                    () => Math.floor(Math.random() * 3+1))
        );

        cloud = [
            [1,2,2],
            [1,4,2],
            [2,3,2]
        ]
        console.log(cloud)


        for (let i = 0; i <= cloudWide-1; i++) {
            for (let j = 0; j <= cloudSize-1; j++) {
                // if (cloud[i][j]<3)cloud[i][j]=3
                console.log(cloud[i])
                if ((i+j)%3){
                    geometry = new THREE.IcosahedronGeometry(cloud[i][j]/4);
                } else {
                    geometry = new THREE.DodecahedronGeometry(cloud[i][j]/4);
                }

                material = new THREE.MeshPhongMaterial( {
                    color: 0xc2f1ee,
                    shading: THREE.FlatShading
                } );
                sphere = new THREE.Mesh( geometry, material );
                sphere.position.y = 10;
                let centerSphere = cloud[(cloudSize-1)/2][(cloudSize-1)/2]-Math.sqrt(Math.pow((cloudSize-i),2)+Math.pow((cloudSize-j),2));
                sphere.position.x = centerSphere + cloud[i][j];
                sphere.position.z = centerSphere + cloud[i][j];
                sphere.renderOrder = 2;
                sphere.material.depthTest = false;
                console.log(sphere)
                Game.scene.add( sphere );
            }
        }

	}
    
	public update() {}
}

