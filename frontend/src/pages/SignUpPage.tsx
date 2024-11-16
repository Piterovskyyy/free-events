import { useState } from "react";

const SignUpPage: React.FC = () => {

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data:', formData);
      };
    
      return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
          <div className="card w-full max-w-md bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-center text-2xl font-bold">Rejestracja</h2>
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
                    <span className="label-text">Nazwa użytkownika</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Podaj nazwę użytkownika"
                    className="input input-bordered w-full"
                    value={formData.username}
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
                <div className="form-control mt-4">
                  <button className="btn btn-primary w-full">Zarejestruj się</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default SignUpPage;