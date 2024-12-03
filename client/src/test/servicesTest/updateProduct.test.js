import { vi, test, expect } from 'vitest';
import Swal from 'sweetalert2';
import { updateProductForm } from '../../services/updateProduct.js';
import { callApiUpdatePoducts } from '../../services/callApiProducts.js';

// Mock Swal
vi.mock('sweetalert2', () => ({
    default: {
        fire: vi.fn(),
        getPopup: vi.fn(),
        showValidationMessage: vi.fn(),
    },
}));

// Mock the API function
vi.mock('../../services/callApiProducts', () => ({
    callApiUpdatePoducts: vi.fn(),
}));

// Test 1: Valid inputs
test('updateProductForm - calls API with valid inputs', async () => {
    Swal.fire.mockResolvedValue({
        isConfirmed: true,
        value: {
            description: 'New description',
            price: '100',
            tags: ['tag1', 'tag2'],
        },
    });

    callApiUpdatePoducts.mockResolvedValue({ status: '200' });

    const result = await updateProductForm('test-file');

    expect(callApiUpdatePoducts).toHaveBeenCalledWith('test-file', {
        description: 'New description',
        price: '100',
        tags: ['tag1', 'tag2'],
    });

    expect(result).toBe(true);
});

// Test 2: Invalid price
test('updateProductForm - handles invalid price gracefully', async () => {
    Swal.getPopup.mockReturnValue({
        querySelector: (selector) => {
            if (selector === '#price') return { value: '-50' }; 
            return { value: '' };
        },
    });

    Swal.fire.mockResolvedValue({
        isConfirmed: true,
        value: null, 
    });

    const result = await updateProductForm('test-file');

    expect(result).toBe(false);
});

// Test 3: All fields empty
test('updateProductForm - handles empty fields gracefully', async () => {
    Swal.getPopup.mockReturnValue({
        querySelector: () => ({ value: '' }),
    });

    Swal.fire.mockResolvedValue({
        isConfirmed: true,
        value: null, 
    });

    const result = await updateProductForm('test-file');

    expect(result).toBe(false);
});

// Test 4: User cancels the action
test('updateProductForm - handles user cancellation', async () => {
    Swal.fire.mockResolvedValue({
        isConfirmed: false,
    });

    const result = await updateProductForm('test-file');

    expect(result).toBe(false);
});
