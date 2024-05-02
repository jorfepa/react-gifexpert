import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import useFetchGifs from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs');

describe('Pruebas sobre GifGrid', () => {
    const category = 'One Punch';

    test('Debe de mostrar el loading', () => {
        useFetchGifs.mockReturnValue({
            images: [],
            isLoading: true,
        });

        render(<GifGrid category={category} />);
        expect(screen.getByText('Cargando...'));
        expect(screen.getByText(category));
    });

    test('Debe de mostrar items cuando se cargan imagenes de useFetchGifs', () => {
        const gifs = [
            {
                id: 'abc',
                title: 'Saitama',
                url: 'https://localhost/saitama.jpg',
            },
            {
                id: 'def',
                title: 'Goku',
                url: 'https://localhost/goku.jpg',
            },
        ];

        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: true,
        });

        render(<GifGrid category={category} />);

        expect(screen.getAllByRole('img').length).toBe(2);
    });
});
