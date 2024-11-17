import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = () => {

    }

    return (
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
    )
}

export default SignInPage;