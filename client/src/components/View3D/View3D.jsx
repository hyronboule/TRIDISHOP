import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './view3D.scss'

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

            camera.position.set(center.x, center.y, distance * 0.50);
            camera.lookAt(center);
            camera.updateProjectionMatrix();
        }
    }, [scene, camera]);

    return <primitive ref={modelRef} object={scene}  rotation={[Math.PI / 3, 0, 0]} />;
};

const View3D = ({ modelUrl, moveBool }) => {
    const [urlFile, setUrlFile] = useState(null);

    useEffect(() => {
        if (modelUrl) {
            setUrlFile(modelUrl);
        }
    }, [modelUrl]);

    return (
        <Canvas className='canva3D' style={{
            width: '100%',
            height:'70%',
        }}>
            <ambientLight intensity={1} />
            <directionalLight position={[0, 15, 15]} intensity={3.0} />
            <Suspense>
                {urlFile ? <Model url={urlFile} /> : <p>Loading the file URL...</p>}
            </Suspense>
            {moveBool && <OrbitControls />}
        </Canvas>

    );
};

export default View3D;
