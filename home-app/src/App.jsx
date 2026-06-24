import { lazy, Suspense } from 'react';
import "./styles.css";

const Header = lazy(() => import('headerApp/Header'));

const images = [
    `https://picsum.photos/seed/${Math.random()}/800/600`,
    `https://picsum.photos/seed/${Math.random()}/800/600`,
    `https://picsum.photos/seed/${Math.random()}/800/600`,
    `https://picsum.photos/seed/${Math.random()}/800/600`,
    `https://picsum.photos/seed/${Math.random()}/800/600`,
    `https://picsum.photos/seed/${Math.random()}/800/600`,
    `https://picsum.photos/seed/${Math.random()}/800/600`,
    `https://picsum.photos/seed/${Math.random()}/800/600`,
];

export default function App() {
    return (
        <div>
            <Suspense fallback={<p className="loading">Loading remote header...</p>}>
                <Header />
            </Suspense>

            <main className="wrapper">
                <h2>Gallery owned by home-app</h2>

                <section className="gallery">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt="Random Gallery Item" />
                    ))}
                </section>
            </main>
        </div>
    );
}
