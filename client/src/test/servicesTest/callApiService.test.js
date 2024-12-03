import { vi, test, expect } from 'vitest';
import axios from 'axios';
import { callApiServicePayment } from '../../services/callApiService.js';

vi.mock('axios');

// Test 1: Successful payment request
test('callApiServicePayment - successful API call', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();
    const mockResponse = { data: { message: 'Payment processed successfully' } };
    axios.post.mockResolvedValue({
        status: 200,
        data: mockResponse.data,
    });

    const buyerId = 'buyer123';
    const sellers = [
        { sellerId: 'seller1', amount: 100 },
        { sellerId: 'seller2', amount: 200 },
    ];

    const result = await callApiServicePayment(buyerId, sellers);

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        buyerId: buyerId,
        payments: sellers,
    });
    expect(result).toEqual(mockResponse.data);
    console.error = originalConsoleError;
});

// Test 2: Invalid sellers (not an array)
test('callApiServicePayment - throws error when sellers is not an array', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn(); 
    const buyerId = 'buyer123';
    const sellers = null; // Invalid sellers

    await expect(callApiServicePayment(buyerId, sellers)).rejects.toThrow(
        'Sellers must be a non-empty array'
    );
    console.error = originalConsoleError;
});

// Test 3: Empty sellers array
test('callApiServicePayment - throws error when sellers is an empty array', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn(); 
    const buyerId = 'buyer123';
    const sellers = []; // Empty array

    await expect(callApiServicePayment(buyerId, sellers)).rejects.toThrow(
        'Sellers must be a non-empty array'
    );
    console.error = originalConsoleError;
});

// Test 4: API call fails
test('callApiServicePayment - handles API error', async () => {
    const originalConsoleError = console.error;
    console.error = vi.fn(); 
    axios.post.mockRejectedValue(new Error('API error'));

    const buyerId = 'buyer123';
    const sellers = [
        { sellerId: 'seller1', amount: 100 },
        { sellerId: 'seller2', amount: 200 },
    ];

    await expect(callApiServicePayment(buyerId, sellers)).rejects.toThrow('API error');

    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        buyerId: buyerId,
        payments: sellers,
    });
    console.error = originalConsoleError;
});
