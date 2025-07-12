import { render } from '@testing-library/react';

import ThemeToggle from './theme-toggle';

describe('ThemeToggle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeToggle />);
    expect(baseElement).toBeTruthy();
  });
});
