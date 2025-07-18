import { render } from '@testing-library/react';

import FrontendApi from './frontend-api';

describe('FrontendApi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendApi />);
    expect(baseElement).toBeTruthy();
  });
});
