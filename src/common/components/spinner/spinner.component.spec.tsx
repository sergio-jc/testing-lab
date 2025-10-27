import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import * as reactPromiseTracker from 'react-promise-tracker';

vi.mock('react-promise-tracker');

describe('spinner.component', () => {
  it('should be render as expected', () => {
    // Arrange
    vi.spyOn(reactPromiseTracker, 'usePromiseTracker').mockResolvedValue({
      promiseInProgress: true,
    });

    // Act
    const { getByTestId } = render(<SpinnerComponent />);
    // const element = getByTestId('spinner-id');
    screen.debug();

    // Assert
    // expect(element).toBeInTheDocument();
  });
});
