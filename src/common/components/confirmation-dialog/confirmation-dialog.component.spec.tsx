import * as React from 'react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const requiredProps: React.ComponentProps<typeof ConfirmationDialogComponent> =
  {
    title: 'title test',
    isOpen: true,
    onAccept: vi.fn(),
    onClose: vi.fn(),
    children: 'children test',
    labels: {
      acceptButton: 'test accept',
      closeButton: 'test cancel',
    },
  };

describe('confirmation-dialog.component', () => {
  it('should be render as expected passing required properties', () => {
    // Arrange
    render(<ConfirmationDialogComponent {...requiredProps} />);

    // Act
    const dialogContainer = screen.getByRole('dialog');
    const dialogTitle = screen.getByRole('heading', { level: 2 });
    const closeButton = screen.getByRole('button', {
      name: requiredProps.labels.closeButton,
    });
    const acceptButton = screen.getByRole('button', {
      name: requiredProps.labels.acceptButton,
    });
    const children = within(dialogContainer).getByText(
      requiredProps.children as string
    );

    // Assert
    expect(dialogContainer).toBeInTheDocument();
    expect(dialogTitle).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });

  it('should be hide when isOpen is false', () => {
    // Arrange
    render(<ConfirmationDialogComponent {...requiredProps} isOpen={false} />);

    // Act
    const dialogContainer = screen.queryByRole('dialog');

    // Assert
    expect(dialogContainer).not.toBeInTheDocument();
  });

  it('should close the dialog when click on close button', async () => {
    // Arrange
    render(<ConfirmationDialogComponent {...requiredProps} />);

    // Act
    const closeButton = screen.getByRole('button', {
      name: requiredProps.labels.closeButton,
    });
    await userEvent.click(closeButton);

    // Assert
    expect(requiredProps.onClose).toHaveBeenCalledOnce();
  });

  it('should close the dialog when click on accept button', async () => {
    // Arrange
    render(<ConfirmationDialogComponent {...requiredProps} />);

    // Act
    const acceptButton = screen.getByRole('button', {
      name: requiredProps.labels.acceptButton,
    });

    await userEvent.click(acceptButton);

    // Assert
    expect(requiredProps.onAccept).toHaveBeenCalledOnce();
    expect(requiredProps.onClose).toHaveBeenCalledOnce();
  });
});
