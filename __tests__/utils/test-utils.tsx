import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, options);
}

export * from '@testing-library/react';
export { renderWithProviders };