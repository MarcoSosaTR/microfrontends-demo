import { lazy, Suspense } from 'react';
import "./styles.css";

const Header = lazy(() => import('headerApp/Header'));

const imageSizes = [480, 800, 1200];

const createImageSeed = (index) =>
    `portfolio-gallery-${index + 1}-${Math.random().toString(36).slice(2, 10)}`;

const images = Array.from({ length: 16 }, (_, index) => {
    const seed = createImageSeed(index);

    return {
        id: seed,
        alt: `Gallery item ${index + 1}`,
        src: `https://picsum.photos/seed/${seed}/1200/900`,
        srcSet: imageSizes
            .map((width) => {
                const height = Math.round(width * 0.75);
                return `https://picsum.photos/seed/${seed}/${width}/${height} ${width}w`;
            })
            .join(', '),
    };
});

export default function App() {
    return (
        <div>
            <Suspense fallback={<p className="loading">Loading remote header...</p>}>
                <Header />
            </Suspense>

            <main className="wrapper">
                <h2>Gallery owned by home-app</h2>

                <section className="gallery" aria-label="Image gallery">
                    {images.map((image, index) => (
                        <img
                            key={image.id}
                            src={image.src}
                            srcSet={image.srcSet}
                            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 960px) calc((100vw - 48px) / 2), (max-width: 1200px) calc((100vw - 96px) / 3), 250px"
                            alt={image.alt}
                            width="1200"
                            height="900"
                            loading={index === 0 ? 'eager' : 'lazy'}
                            fetchPriority={index === 0 ? 'high' : 'auto'}
                            decoding="async"
                        />
                    ))}
                </section>
            </main>
        </div>
    );
}
