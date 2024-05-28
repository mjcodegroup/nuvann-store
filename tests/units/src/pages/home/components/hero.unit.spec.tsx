import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '@/pages/home/components/hero/index';
import heroImagesMock from '@/utils/mocks/home/hero-images-slider.mock';

describe("Hero", () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });


    it('renders images correctly', () => {
        render(<Hero images={heroImagesMock} autoSlideInterval={3000} />);
        heroImagesMock.forEach((src, index) => {
            const img = screen.getByAltText(`Slide ${index + 1}`);
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('src', "/_next/image?url=%2Fimg.jpg&w=96&q=75");
        });
    });

    it('slides change automatically', async () => {
        jest.useFakeTimers();
        render(<Hero images={heroImagesMock} autoSlideInterval={3000} />);
        
        expect(screen.getByAltText('Slide 1')).toBeVisible();
        jest.advanceTimersByTime(3000);
        await waitFor(() => expect(screen.getByAltText('Slide 2')).toBeVisible());
        
        jest.advanceTimersByTime(3000);
        await waitFor(() => expect(screen.getByAltText('Slide 3')).toBeVisible());
        
        jest.advanceTimersByTime(3000);
        await waitFor(() => expect(screen.getByAltText('Slide 1')).toBeVisible());
        
        jest.useRealTimers();
    });

    it('pauses auto-slide on hover', async () => {
        jest.useFakeTimers();
        const { container } = render(<Hero images={heroImagesMock} autoSlideInterval={3000} />);
        
        const slider = container.querySelector('.carousel');
        
        if (slider) {
            fireEvent.mouseOver(slider);
            jest.advanceTimersByTime(6000);
            expect(screen.getByAltText('Slide 1')).toBeVisible();

            fireEvent.mouseOut(slider);
            jest.advanceTimersByTime(3000);
            await waitFor(() => expect(screen.getByAltText('Slide 2')).toBeVisible());
        }
        
        jest.useRealTimers();
    });

    it('renders correctly with an empty array of images', () => {
        render(<Hero images={[]} autoSlideInterval={3000} />);
        expect(screen.queryByAltText('Slide 1')).not.toBeInTheDocument();
    });

    it('handles undefined autoSlideInterval correctly', async () => {
        jest.useFakeTimers();
        render(<Hero images={heroImagesMock} />);
        
        expect(screen.getByAltText('Slide 1')).toBeVisible();
        jest.advanceTimersByTime(3000);
        await waitFor(() => expect(screen.getByAltText('Slide 2')).toBeVisible());
        
        jest.useRealTimers();
    });

    it('cleans up auto-slide interval on unmount', () => {
        jest.useFakeTimers();
        const { unmount } = render(<Hero images={heroImagesMock} autoSlideInterval={3000} />);
        unmount();
        
        expect(jest.getTimerCount()).toBe(0);
        
        jest.useRealTimers();
    });

    it('useEffect sets up and cleans up interval correctly', () => {
        jest.spyOn(global, 'setInterval');
        jest.spyOn(global, 'clearInterval');

        const { unmount } = render(<Hero images={heroImagesMock} autoSlideInterval={3000} />);
        
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 3000);

        unmount();
        expect(clearInterval).toHaveBeenCalledTimes(1);
        
        jest.restoreAllMocks();
    });

    it('handleNextSlide works correctly', () => {
        render(<Hero images={heroImagesMock} autoSlideInterval={3000} />);
        
        fireEvent.click(screen.getByRole('button', { name: /_next/i }));
        expect(screen.getByAltText('Slide 2')).toBeVisible();

        fireEvent.click(screen.getByRole('button', { name: /_next/i }));
        expect(screen.getByAltText('Slide 3')).toBeVisible();

        fireEvent.click(screen.getByRole('button', { name: /_next/i }));
        expect(screen.getByAltText('Slide 1')).toBeVisible();
    });

    it('handlePrevSlide works correctly', () => {
        render(<Hero images={heroImagesMock} autoSlideInterval={3000} />);
        
        fireEvent.click(screen.getByRole('button', { name: /_prev/i }));
        expect(screen.getByAltText('Slide 3')).toBeVisible();

        fireEvent.click(screen.getByRole('button', { name: /_prev/i }));
        expect(screen.getByAltText('Slide 2')).toBeVisible();

        fireEvent.click(screen.getByRole('button', { name: /_prev/i }));
        expect(screen.getByAltText('Slide 1')).toBeVisible();
    });
});
