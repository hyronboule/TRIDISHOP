import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Stack } from '@mui/material';

function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = Cookies.get('siteConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {

        Cookies.set('siteConsent', 'true', { expires: 365, secure: true, sameSite: 'strict' });
        setShowBanner(false);
    };

    if (!showBanner) {
        return null;
    }

    return (
        <Stack color='white' padding={3} width={{ xs: 200, sm: 400 }} height={200} justifyContent={'space-evenly'} position={'fixed'} zIndex={2000} borderRadius={5} sx={{
            background: '#333',
            top: '10px',
            left: '50%',
            transform: 'translate( -50%)',
        }}>
            <p style={{ fontSize: '13px', }}>
                Ce site utilise uniquement les données nécessaires pour assurer son bon fonctionnement. Aucune donnée supplémentaire ne sera collectée ou utilisée.
            </p>
            <button
                aria-label="Accepter les conditions"
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    marginTop: '10px',
                }}
                onClick={handleAccept}
            >
                J'accepte
            </button>
        </Stack>
    );
}

export default CookieConsent;
