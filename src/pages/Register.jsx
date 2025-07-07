import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: formData.username,
    email: formData.email,
    password: formData.password
  })
});


    if (res.ok) {
      navigate('/login');
    } else {
      alert("Registration failed");
    }
  } catch (error) {
    console.error("Register error:", error);
    alert("Something went wrong");
  }
};


  useEffect(() => {
  if (window.particlesJS) {
    window.particlesJS('particles-js', {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#00d4ff" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 }
        },
        opacity: {
          value: 0.8,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false }
        },
        size: {
          value: 5,
          random: true,
          anim: { enable: true, speed: 2, size_min: 1, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00d4ff",
          opacity: 0.6,
          width: 1.5
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    });
  }
}, []);

   

  return (
    <div>
      <div id="particles-js"></div>
      <div className="container">
        <div className="form-box">
          <h2>Register</h2>
          <p>Create Your Account</p>

          <form onSubmit={handleRegister}>
            <div className="input-group">
              <input
                type="text"
                id="username"
                name="username"
                required
                className="input-field"
                value={formData.username}
                onChange={handleChange}
              />
              <label htmlFor="username">Username</label>
              <div className="glow-line"></div>
            </div>

            <div className="input-group">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="input-field"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <div className="glow-line"></div>
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                name="password"
                required
                className="input-field"
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <div className="glow-line"></div>
            </div>

            <button type="submit" className="login-btn">
              <span>REGISTER</span>
              <div className="btn-glow"></div>
            </button>

            <div className="signup-link">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
