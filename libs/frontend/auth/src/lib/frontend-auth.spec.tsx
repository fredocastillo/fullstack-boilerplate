import { render } from '@testing-library/react';

import FrontendAuth from './frontend-auth';

describe('FrontendAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendAuth />);
    expect(baseElement).toBeTruthy();
  });
});
