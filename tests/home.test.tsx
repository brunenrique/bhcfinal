import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('exibe mensagem de boas-vindas', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /bem-vindo/i })).toBeInTheDocument();
  });
});
