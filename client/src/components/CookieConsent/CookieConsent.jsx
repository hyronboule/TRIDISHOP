import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Stack } from '@mui/material';

function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const isLocalhost = window.location.hostname === 'localhost';
    const config = { 
        expires: 365, 
        sameSite: 'Lax',
        domain: isLocalhost ? undefined : 'tridishop.site',
        path: '/'
    }

    useEffect(() => {
        // Récupère la valeur du consentement
        const consent = Cookies.get('siteConsent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        // Définit le consentement sur 'accepted'
        Cookies.set('siteConsent', 'accepted', config);
        setShowBanner(false);
    };

    const handleReject = () => {
        // Définit le consentement sur 'rejected'
        Cookies.set('siteConsent', 'rejected', config);
        setShowBanner(false);
    };

    if (!showBanner) {
        return null; // Cache la bannière si le consentement existe déjà
    }

    return (
        <Stack
            color="white"
            padding={3}
            width={{ xs: 200, sm: 400 }}
            justifyContent="space-evenly"
            position="fixed"
            zIndex={2000}
            borderRadius={5}
            sx={{
                background: '#333',
                top: '10px',
                left: '50%',
                transform: 'translate(-50%)',
            }}
        >
            <p style={{ fontSize: '13px' }}>
                Ce site utilise uniquement des cookies strictement nécessaires pour assurer son bon fonctionnement. Aucun cookie tiers ou publicitaire n’est collecté.
            </p>
            <p style={{ fontSize: '13px' }}>
                Pour toute précision, veuillez consulter notre page de support. Une adresse email est disponible pour nous contacter.
            </p>
            <a
                href="/support"
                style={{
                    color: '#4CAF50',
                    textDecoration: 'underline',
                    fontSize: '12px',
                }}
            >
                En savoir plus
            </a>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                    aria-label="Accepter les conditions"
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                    }}
                    onClick={handleAccept}
                >
                    J'accepte
                </button>
                <button
                    aria-label="Refuser les conditions"
                    style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        cursor: 'pointer',
                    }}
                    onClick={handleReject}
                >
                    Je refuse
                </button>
            </div>
        </Stack>
    );
}

export default CookieConsent;
