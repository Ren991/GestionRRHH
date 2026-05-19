import '@testing-library/jest-dom';

// Mock next/navigation or next/cache if tests import server actions that call them
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));
