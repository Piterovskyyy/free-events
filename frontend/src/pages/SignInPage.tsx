import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        
        try {
          const url = 'http://localhost:8080/api/users/login';
          const response = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        } catch(e: any) {
          setErrorMessage(e.response.data);
        } finally {
          setLoading(false);
        }}

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-base-200">
                <div className="card w-full max-w-md bg-base-100 shadow-xl relative">
                    { isLoading && 
                        <div className="absolute left-0 top-0 w-full h-full flex justify-center rounded-2xl align-middle bg-opacity-70 bg-slate-800">
                            <span className="loading loading-spinner loading-lg text-white"></span>
                        </div>
                    }
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Logowanie</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Podaj email"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            </div>
                            <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Hasło</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Podaj hasło"
                                className="input input-bordered w-full"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            </div>
                            <p className="mt-2">Nie masz konta? <span className="underline cursor-pointer hover:text-primary" onClick={() => navigate('/sign-up')}>Zarejestruj się</span>.</p>
                            <div className="form-control mt-4">
                            <button className="btn btn-primary w-full">Zaloguj się</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            { errorMessage && 
                <div role="alert" className="absolute bottom-0 right-0 m-5 w-96 alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{ errorMessage }</span>
                </div>
            }
        </>
    )
}

export default SignInPage;