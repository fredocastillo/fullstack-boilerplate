import { render } from '@testing-library/react';

import FrontendFeatures from './frontend-features';

describe('FrontendFeatures', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendFeatures />);
    expect(baseElement).toBeTruthy();
  });
});
