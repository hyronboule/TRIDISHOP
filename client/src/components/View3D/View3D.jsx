import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ url }) => {
    const { scene } = useGLTF(url);
    const modelRef = useRef();
    const { camera } = useThree();

    useEffect(() => {
        if (modelRef.current) {
            const box = new THREE.Box3().setFromObject(modelRef.current);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            const distance = Math.abs(maxDim / Math.sin(fov / 2));

            // Reduce the camera distance to zoom in on the object
            const zoomedDistance = distance * 0.5; // Adjust the zoom factor as needed

            camera.position.set(center.x, center.y, zoomedDistance + 2);
            camera.lookAt(center);
            camera.updateProjectionMatrix();

        }
    }, [scene, camera]);

    return (
        <primitive
            ref={modelRef}
            object={scene}
            scale={[3, 3, 3]} // Scale the model by a factor of 3
            rotation={[Math.PI / 3, 0, 0]} // Rotate 60 degrees on the X-axis
        />
    );
};

const View3D = ({ modelUrl, moveBool }) => {
    const [urlFile, setUrlFile] = useState(null);

    useEffect(() => {
        if (modelUrl) {
            setUrlFile(modelUrl);
        }
    }, [modelUrl]);

    return (
        <>
            {urlFile ? (
                <Canvas>
                    {/* Ambient light for a stronger overall illumination */}
                    <ambientLight intensity={0.6} /> {/* Increased for general lighting */}

                    {/* Main directional light coming from above */}
                    <directionalLight
                        position={[0, 10, 5]} // Light coming from above
                        intensity={1.5} // Increased intensity for more brightness
                        castShadow
                    />

                    {/* Secondary light coming from another angle to reduce shadows */}
                    <directionalLight
                        position={[0, 20, 20]} // Light from another direction
                        intensity={0.5} // Secondary light
                    />

                    {/* Suspense to display a loading state while the model is loading */}
                    <Suspense>
                        <Model url={urlFile} />
                    </Suspense>

                    {/* Camera controls to allow interaction with the model */}
                    {moveBool && <OrbitControls />}
                </Canvas>
            ) : (
                <p>Loading the file URL...</p> // Display loading message when loading
            )}
        </>
    );
};

export default View3D;
