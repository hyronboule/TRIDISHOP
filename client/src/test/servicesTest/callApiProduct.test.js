import { vi, test, expect } from 'vitest';
import axios from 'axios';
import {
    callApiProductsUser,
    callApiAllProducts,
    callApiPageProducts,
    callApiDetailProduct,
    addNewProductApi,
    callApiUpdatePoducts,
    deleteProduct,
    updateNameUserAllProducts
} from '../../services/callApiProducts.js';
import { url } from '../../services/url';

vi.mock('axios');
vi.spyOn(console, 'error').mockImplementation(() => {});

// Test for `callApiProductsUser`
test('callApiProductsUser - successful API call', async () => {
    const mockResponse = { data: [{ id: 1, name: 'Product 1' }] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await callApiProductsUser('testUser');

    expect(axios.get).toHaveBeenCalledWith(`${url.userProducts}`, { params: { name: 'testUser' } });
    expect(result).toEqual(mockResponse.data);
});

test('callApiProductsUser - handles API error', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const result = await callApiProductsUser('invalidUser');

    expect(result).toBeUndefined(); 
});

// Test for `callApiAllProducts`
test('callApiAllProducts - successful API call', async () => {
    const mockResponse = { data: [{ id: 1, name: 'Product 1' }] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await callApiAllProducts();

    expect(axios.get).toHaveBeenCalledWith(url.products);
    expect(result).toEqual(mockResponse.data);
});

test('callApiAllProducts - handles API error', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const result = await callApiAllProducts();

    expect(result).toBeUndefined(); 
});

// Test for `callApiPageProducts`
test('callApiPageProducts - successful API call', async () => {
    const mockResponse = { data: [{ id: 1, name: 'Product 1' }] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await callApiPageProducts('http://example.com/products?page=1');

    expect(axios.get).toHaveBeenCalledWith('http://example.com/products?page=1');
    expect(result).toEqual(mockResponse.data);
});

test('callApiPageProducts - handles API error', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const result = await callApiPageProducts('http://example.com/products?page=1');

    expect(result).toBeUndefined(); 
});

// Test for `callApiDetailProduct`
test('callApiDetailProduct - successful API call', async () => {
    const mockResponse = { data: { id: 1, name: 'Product 1' } };
    axios.get.mockResolvedValue(mockResponse);

    const result = await callApiDetailProduct(1);

    expect(axios.get).toHaveBeenCalledWith(`${url.product}/1`);
    expect(result).toEqual(mockResponse.data);
});

test('callApiDetailProduct - handles API error', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const result = await callApiDetailProduct(1);

    expect(result).toBeUndefined(); 
});

// Test for `addNewProductApi`
test('addNewProductApi - successful product addition', async () => {
    const mockResponse = { data: { message: 'Product added successfully' } };
    axios.post.mockResolvedValue(mockResponse);

    const addData = {
        pseudo: 'testUser',
        description: 'Test product',
        tags: ['tag1', 'tag2'],
        price: 100,
        files: [],
    };

    const result = await addNewProductApi(addData);

    expect(axios.post).toHaveBeenCalledWith(url.upload, expect.any(FormData), {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    expect(result).toEqual(mockResponse);
});

test('addNewProductApi - handles API error', async () => {
    axios.post.mockRejectedValue(new Error('API error'));

    const addData = {
        pseudo: 'testUser',
        description: 'Test product',
        tags: ['tag1', 'tag2'],
        price: 100,
        files: [],
    };

    const result = await addNewProductApi(addData);

    expect(result).toBeUndefined(); 
});

// Test for `callApiUpdatePoducts`
test('callApiUpdatePoducts - successful product update', async () => {
    const mockResponse = { data: { message: 'Product updated successfully' } };
    axios.put.mockResolvedValue(mockResponse);

    const token = 'mockToken123';
    const updateData = { description: 'Updated product' };

    const result = await callApiUpdatePoducts('testFile', updateData, token);

    expect(axios.put).toHaveBeenCalledWith(
        `${url.updateProduct}/testFile`,
        expect.any(FormData),
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        }
    );

    expect(result).toEqual(mockResponse);
});


test('callApiUpdatePoducts - handles API error', async () => {
    axios.put.mockRejectedValue(new Error('API error'));

    const token = 'mockToken123';
    const updateData = { description: 'Updated product' };

    const result = await callApiUpdatePoducts('testFile', updateData, token);

    expect(axios.put).toHaveBeenCalledWith(
        `${url.updateProduct}/testFile`,
        expect.any(FormData), 
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        }
    );
    expect(result).toBeUndefined(); 
});

// Test for `deleteProduct`
test('deleteProduct - successful deletion', async () => {
    axios.delete.mockResolvedValue({ status: 200 });

    const token = 'mockToken123';
    const result = await deleteProduct('testFile', token);

    expect(axios.delete).toHaveBeenCalledWith(
        `${url.deleteProduct}/testFile`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    expect(result).toBe(200);
});

test('deleteProduct - handles API error', async () => {
    axios.delete.mockRejectedValue(new Error('API error'));

    const token = 'mockToken123';
    const result = await deleteProduct('testFile', token);

    expect(axios.delete).toHaveBeenCalledWith(
        `${url.deleteProduct}/testFile`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    expect(result).toBeUndefined();
});


// Test for `updateNameUserAllProducts`
test('updateNameUserAllProducts - successful update', async () => {
    const mockResponse = { data: { message: 'Name updated successfully' } };
    axios.put.mockResolvedValue(mockResponse);

    const token = 'mockToken123';

    const result = await updateNameUserAllProducts('oldName', 'newPseudo', token);

    expect(axios.put).toHaveBeenCalledWith(
        url.updateNameUserAllProduct,
        null,
        {
            params: { name: 'oldName', pseudo: 'newPseudo' },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    expect(result).toEqual(mockResponse.data);
});

test('updateNameUserAllProducts - handles API error', async () => {
    axios.put.mockRejectedValue(new Error('API error')); 

    const token = 'mockToken123';

    try {
        await updateNameUserAllProducts('oldName', 'newPseudo', token);
    } catch (error) {
      
        expect(error).toEqual(new Error('API error'));
    }

    expect(axios.put).toHaveBeenCalledWith(
        url.updateNameUserAllProduct,
        null,
        {
            params: { name: 'oldName', pseudo: 'newPseudo' },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
});
