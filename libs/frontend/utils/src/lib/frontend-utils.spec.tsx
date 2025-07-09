import { render } from '@testing-library/react';

import FrontendUtils from './frontend-utils';

describe('FrontendUtils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendUtils />);
    expect(baseElement).toBeTruthy();
  });
});
