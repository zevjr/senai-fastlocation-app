import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { AddressList } from '../../../src/modules/home/components/AddressList';
import { Address } from '../../../src/modules/home/model/Address';

const mockAddresses: Address[] = [
  {
    cep: '01310-100',
    logradouro: 'Avenida Paulista',
    complemento: '',
    bairro: 'Bela Vista',
    localidade: 'São Paulo',
    uf: 'SP',
  },
  {
    cep: '20040-020',
    logradouro: 'Avenida Rio Branco',
    complemento: '',
    bairro: 'Centro',
    localidade: 'Rio de Janeiro',
    uf: 'RJ',
  },
];

describe('AddressList', () => {
  it('should render all addresses in the list', () => {
    render(<AddressList addresses={mockAddresses} />);

    expect(screen.getByText('Avenida Paulista')).toBeTruthy();
    expect(screen.getByText('Avenida Rio Branco')).toBeTruthy();
  });

  it('should render EmptySearch when addresses array is empty', () => {
    render(<AddressList addresses={[]} />);

    expect(screen.getByText('Nenhum resultado encontrado.')).toBeTruthy();
    expect(screen.getByText('Verifique os dados e tente novamente.')).toBeTruthy();
  });

  it('should render title when provided', () => {
    render(<AddressList addresses={mockAddresses} title="2 endereços encontrados" />);

    expect(screen.getByText('2 endereços encontrados')).toBeTruthy();
  });

  it('should not render title when not provided', () => {
    render(<AddressList addresses={mockAddresses} />);

    expect(screen.queryByText('endereços encontrados')).toBeNull();
  });

  it('should render address city and state', () => {
    render(<AddressList addresses={[mockAddresses[0]]} />);

    expect(screen.getByText('São Paulo — SP')).toBeTruthy();
  });

  it('should render CEP value', () => {
    render(<AddressList addresses={[mockAddresses[0]]} />);

    expect(screen.getByText('01310-100')).toBeTruthy();
  });
});
