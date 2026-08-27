import { fireEvent, render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('shows the task overview by default', () => {
    render(<App />);
    expect(screen.getByText('Task Overview')).toBeInTheDocument();
  });

  it('switches to the implementation workspace', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('tab', { name: 'Implementation' }));

    expect(screen.getByRole('heading', { name: 'Locations' })).toBeInTheDocument();
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });
});
