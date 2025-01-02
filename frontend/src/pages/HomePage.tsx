import { useNavigate } from "react-router-dom";
import TypingEffect from "../TypingEffect";

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://cdn.galleries.smcloud.net/t/galleries/gf-dGRp-JVnF-BHZe_taco-hemingway-wrocil-i-rozniosl-scene-jednak-tego-fani-sie-nie-spodziewali-1920x1080-nocrop.jpg)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Witaj <br/>
                        <span className="flex align-middle justify-center gap-3">
                            <span>w</span>
                            <span className="text-primary">
                                <TypingEffect inputText="Free Events!"/>
                            </span>
                        </span>
                    </h1>
                    <p className="mb-5">
                        Szukasz niezapomnianych przeżyć? Odkryj świat darmowych wydarzeń i koncertów w Twoim mieście i nie tylko!
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate('/events')}>Zarezerwuj bilet!</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;