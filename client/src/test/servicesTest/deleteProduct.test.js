import { vi, test, expect } from 'vitest';
import Swal from 'sweetalert2';
import { deleteConfirmation } from '../../services/deleteProduct.js';
import { deleteProduct } from '../../services/callApiProducts.js';

// Mock Swal
vi.mock('sweetalert2', () => ({
    default: {
        fire: vi.fn(),
    },
}));

// Mock deleteProduct API function
vi.mock('../../services/callApiProducts', () => ({
    deleteProduct: vi.fn(),
}));
afterEach(() => {
    vi.clearAllMocks();
});

// Test 1: User confirms deletion and API responds with success
test('deleteConfirmation - confirms deletion successfully', async () => {
    Swal.fire.mockResolvedValue({
        isConfirmed: true,
    });

    deleteProduct.mockResolvedValue('200');

    const result = await deleteConfirmation('test-file');

    expect(deleteProduct).toHaveBeenCalledWith('test-file');
    expect(result).toBe(true);
});

// Test 2: User confirms deletion but API fails
test('deleteConfirmation - confirms deletion but API fails', async () => {

    Swal.fire.mockResolvedValue({
        isConfirmed: true,
    });

    deleteProduct.mockResolvedValue(null);

    const result = await deleteConfirmation('test-file');

    expect(deleteProduct).toHaveBeenCalledWith('test-file');
    expect(result).toBe(false);
});

// Test 3: User cancels the deletion
test('deleteConfirmation - cancels deletion', async () => {

    Swal.fire.mockResolvedValue({
        isConfirmed: false, // Simulate cancellation
    });

    deleteProduct.mockClear();

    const result = await deleteConfirmation('test-file');

    expect(deleteProduct).toHaveBeenCalledTimes(0);
    expect(result).toBe(false);
});


