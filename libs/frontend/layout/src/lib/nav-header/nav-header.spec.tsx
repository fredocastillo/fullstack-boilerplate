import { render } from '@testing-library/react';

import NavHeader from './nav-header';

describe('NavHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavHeader />);
    expect(baseElement).toBeTruthy();
  });
});
