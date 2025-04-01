import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Stack } from '@mui/material';
import { useUserContext } from '../../context/User';

function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const {displayCookies, setDisplayCookies} = useUserContext()
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
        if (!consent || displayCookies) {
            setShowBanner(!consent || displayCookies);
        }
    }, [displayCookies]);

    const handleAccept = () => {
        // Définit le consentement sur 'accepted'
        Cookies.set('siteConsent', 'accepted', config);
        setShowBanner(false);
        setDisplayCookies(false)
    };

    const handleReject = () => {
        // Définit le consentement sur 'rejected'
        Cookies.set('siteConsent', 'rejected', config);
        setShowBanner(false);
        setDisplayCookies(false)
    };

    if (!showBanner) {
        return null; // Cache la bannière si le consentement existe déjà
    }

    const handleClose = () => {
        setShowBanner(false);
        setDisplayCookies(false);
    };

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
                bottom: '30px',
                right: '5vw',
            }}
        >
            <p style={{ fontSize: '13px' }}>
                Ce site utilise uniquement des cookies strictement nécessaires pour assurer son bon fonctionnement. Aucun cookie tiers ou publicitaire n’est collecté.
            </p>
            <p style={{ fontSize: '13px' }}>
                Pour toute précision, veuillez consulter notre page de support. Une adresse email est disponible pour nous contacter.
            </p>
            <a
                href="/pdc"
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
                        padding: '5px',
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
                        padding: '10px',
                        cursor: 'pointer',
                    }}
                    onClick={handleReject}
                >
                    Je refuse
                </button>
                {displayCookies && (
                    <button
                        aria-label="Fermer la bannière"
                        style={{
                            backgroundColor: '#888',
                            color: 'white',
                            border: 'none',
                            padding: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={handleClose}
                    >
                        Fermer
                    </button>
                )}
            </div>
        </Stack>
    );
}

export default CookieConsent;
