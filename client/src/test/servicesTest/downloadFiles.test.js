import { vi, test, expect } from 'vitest';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { downloadFiles } from '../../services/downloadFiles.js';

// Mock dependencies
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));
vi.mock('jszip', () => ({
  default: vi.fn().mockImplementation(() => ({
    file: vi.fn(),
    generateAsync: vi.fn().mockResolvedValue(new Blob()),
  })),
}));
vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));
vi.mock('jspdf', () => ({
  default: vi.fn().mockImplementation(() => ({
    setFontSize: vi.fn(),
    text: vi.fn(),
    output: vi.fn().mockResolvedValue(new Blob()),
  })),
}));

test('downloadFiles - downloads files, generates a receipt, and creates a ZIP', async () => {
  // Mock axios response
  axios.get.mockResolvedValue({ status: 200, data: new Blob(['3D file content'], { type: 'application/octet-stream' }) });

  // Test data
  const files = [
    { file: { fileUrl: 'https://example.com/file1.glb' } },
    { file: { fileUrl: 'https://example.com/file2.glb' } },
  ];
  const buyerName = 'John Doe';
  const totalAmount = 50;

  // Call the function
  await downloadFiles(files, buyerName, totalAmount);

  // Verify file downloads
  expect(axios.get).toHaveBeenCalledTimes(files.length);
  expect(axios.get).toHaveBeenCalledWith('https://example.com/file1.glb', { responseType: 'blob' });
  expect(axios.get).toHaveBeenCalledWith('https://example.com/file2.glb', { responseType: 'blob' });

  // Verify ZIP contents
  const zipInstance = JSZip.mock.results[0].value;
  expect(zipInstance.file).toHaveBeenCalledTimes(3); // 2 3D files + 1 receipt
  expect(zipInstance.file).toHaveBeenCalledWith('fichier3D0.glb', expect.any(Blob));
  expect(zipInstance.file).toHaveBeenCalledWith('fichier3D1.glb', expect.any(Blob));
  expect(zipInstance.file).toHaveBeenCalledWith('reçu.pdf', expect.any(Blob));

  // Verify ZIP generation
  expect(zipInstance.generateAsync).toHaveBeenCalledWith({ type: 'blob' });

  // Verify ZIP save
  expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'fichier3D.zip');
});

