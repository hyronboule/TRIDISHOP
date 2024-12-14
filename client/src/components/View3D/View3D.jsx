import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './view3D.scss'

/**
 * Component to load and display a 3D model, automatically adjusting the camera 
 * to fit the model's size and center.
 *
 * @param {string} props.url - URL of the 3D model to load.
 * @returns {JSX.Element} - A 3D model rendered in the scene.
 */

const Model = ({ url }) => {
    const { scene } = useGLTF(url);
    const modelRef = useRef();
    const { camera } = useThree();

    useEffect(() => {
        if (modelRef.current) {
             // Compute the bounding box of the model and adjust the camera accordingly.
            const box = new THREE.Box3().setFromObject(modelRef.current);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            const distance = Math.abs(maxDim / Math.sin(fov / 2));

            camera.position.set(center.x, center.y, distance * 0.50); // Position the camera.
            camera.lookAt(center); // Make the camera look at the center of the model.
            camera.updateProjectionMatrix();
        }
    }, [scene, camera]);

    return <primitive ref={modelRef} object={scene}  rotation={[Math.PI / 3, 0, 0]} />;
};

/**
 * Wrapper component to manage and display a 3D model URL dynamically.
 *
 * @param {string} props.modelUrl - URL of the 3D model to render.
 * @param {boolean} props.moveBool - (Optional) Controls model-specific behavior (future implementation).
 * @returns {JSX.Element} - A 3D model viewer.
 */
const View3D = ({ modelUrl, moveBool }) => {
    const [urlFile, setUrlFile] = useState(null);

    useEffect(() => {
        if (modelUrl) {
            setUrlFile(modelUrl); // Update the URL when the prop changes.
        }
    }, [modelUrl]);

    return (
        <Canvas className='canva3D' style={{
            width: '100%',
            height:'65vw',
            maxHeight: '500px',
            minHeight:'400px'
        }}>
            <ambientLight intensity={5} />
            <directionalLight position={[0, 15, 15]} intensity={3.0} />
            <Suspense>
                {urlFile ? <Model url={urlFile} /> : <p>Loading the file URL...</p>}
            </Suspense>
            {moveBool && <OrbitControls />}
        </Canvas>

    );
};

export default View3D;
