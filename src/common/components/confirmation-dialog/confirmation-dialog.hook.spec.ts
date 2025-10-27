import { renderHook, waitFor, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';


describe('useLogin specs', () => {
  it('should return an object with the correct properties', () => {
    // Arrange
    const expectedHookResult: ReturnType<typeof useConfirmationDialog> = {
      isOpen: false,
      itemToDelete: {
        id: '',
        name: '',
      },
      onAccept: expect.any(Function),
      onClose: expect.any(Function),
      onOpenDialog: expect.any(Function),
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current).toEqual(expectedHookResult);
  });

  it('should isOpen will be true when onOpenDialog is called', async () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({
        id: 'test id',
        name: 'test name',
      });
    });

    // Assert
    await waitFor(()=> expect(result.current.isOpen).toBe(true));
  });

  it('should isOpen will be false when onClose is called', async () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onClose();
    });

    // Assert
    await waitFor(()=> expect(result.current.isOpen).toBe(false));
  });

  it('should itemToDelete will be the expected value when onOpenDialog is called', async () => {
    // Arrange
    const expectedItem = {
      id: 'test id',
      name: 'test name',
    };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(expectedItem);
    });

    // Assert
    await waitFor(()=> expect(result.current.itemToDelete).toEqual(expectedItem));
  });
});
