import { vi, test, expect } from 'vitest';
import axios from 'axios';
import Swal from 'sweetalert2';
import { callApiLogin, callApiRegister, callApiUpdateUserAuth } from '../../services/callApiUserAuth.js';

vi.mock('axios');
vi.mock('sweetalert2');

// Tests pour callApiLogin
test('callApiLogin - returns data on successful login', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();
    const mockResponse = { data: { token: 'abc123' } };
    axios.post.mockResolvedValue(mockResponse);

    const result = await callApiLogin('test@example.com', 'password123');

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        email: 'test@example.com',
        password: 'password123',
    });
    expect(result).toEqual(mockResponse.data);
    console.error = originalConsoleError;
});

test('callApiLogin - handles API error', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();
    axios.post.mockRejectedValue(new Error('API error'));

    const result = await callApiLogin('test@example.com', 'wrongpassword');

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        email: 'test@example.com',
        password: 'wrongpassword',
    });
    expect(result).toBeUndefined(); 
    console.error = originalConsoleError;
});

// Tests pour callApiRegister
test('callApiRegister - returns data on successful registration', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();
    const mockResponse = { data: { userId: 'user123' } };
    axios.post.mockResolvedValue(mockResponse);

    const result = await callApiRegister('pseudo123', 'test@example.com', 'password123');

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        pseudo: 'pseudo123',
        email: 'test@example.com',
        password: 'password123',
    });
    expect(result).toEqual(mockResponse.data);
    console.error = originalConsoleError;
});

test('callApiRegister - shows error alert on API error', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();

    axios.post.mockRejectedValue({
        response: {
            data: {
                message: 'User validation failed:  pseudo: pseudo est déjà utilisé.',
            },
        },
    });

    // Appel de la fonction
    await callApiRegister('pseudo123', 'test@example.com', 'password123', '2024-01-01');

   
    expect(Swal.fire).toHaveBeenCalledWith({
        icon: 'error',
        text: ' pseudo est déjà utilisé.', 
    });

    expect(console.error).not.toHaveBeenCalled();

    console.error = originalConsoleError; 
});



// Tests pour callApiUpdateUserAuth
test('callApiUpdateUserAuth - updates user and returns data', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn(); 
    const mockResponse = { data: { message: 'User updated successfully' } };
    axios.put.mockResolvedValue(mockResponse);

    const token = 'mockToken123'; // Simuler un token pour le test
    const result = await callApiUpdateUserAuth({ pseudo: 'newPseudo' }, 'test@example.com', token);

    expect(axios.put).toHaveBeenCalledWith(
        expect.any(String),
        {
            email: 'test@example.com',
            pseudo: 'newPseudo',
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    expect(result).toEqual(mockResponse.data);
    console.error = originalConsoleError; 
});

test('callApiUpdateUserAuth - handles 400 error', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn(); 
    axios.put.mockRejectedValue({ response: { status: 400 } });

    const token = 'mockToken123'; // Simuler un token pour le test
    const result = await callApiUpdateUserAuth({ pseudo: 'newPseudo' }, 'test@example.com', token);

    expect(result).toEqual({
        status: 400,
        message: 'Email ou pseudo déjà utilisé',
    });
    console.error = originalConsoleError; 
});

test('callApiUpdateUserAuth - throws error on unexpected error', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn(); 
    const token = 'mockToken123'; // Simuler un token pour le test
    axios.put.mockRejectedValue(new Error('Unexpected error'));

    await expect(callApiUpdateUserAuth({ pseudo: 'newPseudo' }, 'test@example.com', token)).rejects.toThrow('Unexpected error');
    console.error = originalConsoleError; 
});

