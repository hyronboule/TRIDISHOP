import { vi, test, expect } from 'vitest';
import axios from 'axios';
import { apiCallUserProfil, updatedUserProfil, callApiCreateProfilUser } from '../../services/callApiProfilUser';
import { url } from '../../services/url';

vi.mock('axios');
vi.spyOn(console, 'error').mockImplementation(() => {});

// Test for `apiCallUserProfil`
test('apiCallUserProfil - successful API call', async () => {
    const mockResponse = { data: { pseudo: 'testPseudo', links: {} } };
    axios.get.mockResolvedValue(mockResponse);

    const result = await apiCallUserProfil('testPseudo');

    expect(axios.get).toHaveBeenCalledWith(`${url.userProfil}/testPseudo`);
    expect(result).toEqual(mockResponse.data);
});

test('apiCallUserProfil - handles API error', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const result = await apiCallUserProfil('invalidPseudo');

    expect(axios.get).toHaveBeenCalledWith(`${url.userProfil}/invalidPseudo`);
    expect(result).toBeUndefined(); 
});

// Test for `updatedUserProfil`
test('updatedUserProfil - successful profile update', async () => {
    const mockResponse = { data: { message: 'Profile updated successfully' } };
    axios.put.mockResolvedValue(mockResponse);

    const token = 'mockToken123'; // Simuler un token pour les tests

    const data = {
        instagram: 'https://instagram.com/test',
        facebook: 'https://facebook.com/test',
        pseudo: 'newPseudo',
        image: new Blob(['image data'], { type: 'image/png' }),
        paypalEmail: 'test@example.com',
    };

    const result = await updatedUserProfil(data, 'testPseudo', token);

    expect(axios.put).toHaveBeenCalledWith(
        `${url.updateProfil}/testPseudo`,
        expect.any(FormData),
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    expect(result).toEqual({
        success: true,
        message: mockResponse.data.message,
    });
});

test('updatedUserProfil - handles API error', async () => {
    const mockError = {
        response: { data: { message: 'Error updating profile' } },
    };
    axios.put.mockRejectedValue(mockError);

    const token = 'mockToken123'; // Simuler un token pour les tests

    const data = { pseudo: 'invalidPseudo' };

    const result = await updatedUserProfil(data, 'testPseudo', token);

    expect(result).toEqual({
        sucess: false,
        message: mockError.response.data.message,
    });
});

// Test fot `callApiCreateProfilUser`
test('callApiCreateProfilUser - successful profile creation', async () => {
    const mockResponse = { data: { message: 'Profile created successfully' } };
    axios.post.mockResolvedValue(mockResponse);

    const result = await callApiCreateProfilUser('testPseudo', 'test@example.com');

    expect(axios.post).toHaveBeenCalledWith(url.createProfil, expect.any(FormData), {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    expect(result).toEqual(mockResponse.data);
});

test('callApiCreateProfilUser - handles API error', async () => {
    axios.post.mockRejectedValue(new Error('API error'));

    const result = await callApiCreateProfilUser('invalidPseudo', 'invalid@example.com');

    expect(axios.post).toHaveBeenCalledWith(url.createProfil, expect.any(FormData), {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    expect(result).toBeUndefined(); 
});