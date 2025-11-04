// // import { useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { useAuth } from '../../context/AuthContext';
// // import { supabase } from '../../utils/supabase';
// // import {
// //   Container,
// //   Paper,
// //   TextField,
// //   Button,
// //   Typography,
// //   Box,
// //   Alert
// // } from '@mui/material';

// // export function Register() {
// //   const [userName, setUserName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const { login } = useAuth();
// //   const navigate = useNavigate();

// //   const validateForm = () => {
// //     if (!userName || !email || !password || !confirmPassword) {
// //       setError('All fields are required');
// //       return false;
// //     }
// //     if (userName.length < 3) {
// //       setError('Username must be at least 3 characters');
// //       return false;
// //     }
// //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
// //       setError('Invalid email format');
// //       return false;
// //     }
// //     if (password.length < 6) {
// //       setError('Password must be at least 6 characters');
// //       return false;
// //     }
// //     if (password !== confirmPassword) {
// //       setError('Passwords do not match');
// //       return false;
// //     }
// //     return true;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');

// //     if (!validateForm()) return;

// //     setLoading(true);

// //     try {
// //       const { data: existingUser, error: queryError } = await supabase
// //         .from('users')
// //         .select('*')
// //         .eq('user_id', userName)
// //         .maybeSingle();

// //       if (queryError) throw queryError;

// //       if (existingUser) {
// //         setError('Username already exists');
// //         setLoading(false);
// //         return;
// //       }

// //       const { data, error: insertError } = await supabase
// //         .from('users')
// //         .insert([
// //           {
// //             user_id: userName,
// //             user_name: userName,
// //             email: email,
// //             password: password,
// //             created_at: new Date().toISOString()
// //           }
// //         ])
// //         .select()
// //         .maybeSingle();

// //       if (insertError) throw insertError;

// //       if (data) {
// //         login(data, 'user');
// //         navigate('/dashboard');
// //       }
// //     } catch (err) {
// //       setError('Registration failed. Please try again.');
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
// //       <Paper elevation={3} sx={{ p: 4 }}>
// //         <Typography variant="h4" component="h1" gutterBottom align="center">
// //           Create Account
// //         </Typography>

// //         <Typography variant="body2" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
// //           Sign up to get started
// //         </Typography>

// //         {error && (
// //           <Alert severity="error" sx={{ mb: 2 }}>
// //             {error}
// //           </Alert>
// //         )}

// //         <form onSubmit={handleSubmit}>
// //           <TextField
// //             fullWidth
// //             label="Username"
// //             value={userName}
// //             onChange={(e) => setUserName(e.target.value)}
// //             margin="normal"
// //             required
// //             placeholder="Enter username"
// //           />

// //           <TextField
// //             fullWidth
// //             label="Email"
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             margin="normal"
// //             required
// //             placeholder="Enter email"
// //           />

// //           <TextField
// //             fullWidth
// //             label="Password"
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             margin="normal"
// //             required
// //             placeholder="At least 6 characters"
// //           />

// //           <TextField
// //             fullWidth
// //             label="Confirm Password"
// //             type="password"
// //             value={confirmPassword}
// //             onChange={(e) => setConfirmPassword(e.target.value)}
// //             margin="normal"
// //             required
// //             placeholder="Confirm password"
// //           />

// //           <Button
// //             fullWidth
// //             type="submit"
// //             variant="contained"
// //             size="large"
// //             disabled={loading}
// //             sx={{ mt: 3 }}
// //           >
// //             {loading ? 'Creating Account...' : 'Sign Up'}
// //           </Button>
// //         </form>

// //         <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, textAlign: 'center' }}>
// //           <Typography variant="body2">
// //             Already have an account?{' '}
// //             <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
// //               Login here
// //             </Link>
// //           </Typography>
// //         </Box>
// //       </Paper>
// //     </Container>
// //   );
// // }

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { supabase } from "../../utils/supabase";

// export function Register() {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const validateForm = () => {
//     if (!userName || !password || !confirmPassword) {
//       setError("All fields are required");
//       return false;
//     }
//     if (userName.length < 3) {
//       setError("Username must be at least 3 characters");
//       return false;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return false;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       // Check if username already exists
//       const { data: existingUser, error: queryError } = await supabase
//         .from("users")
//         .select("*")
//         .eq("user_name", userName)
//         .maybeSingle();

//       if (queryError) throw queryError;

//       if (existingUser) {
//         setError("Username already exists");
//         setLoading(false);
//         return;
//       }

//       // Insert new user
//       const { data, error: insertError } = await supabase
//         .from("users")
//         .insert([
//           {
//             id: `user_${Date.now()}`, // generate unique ID
//             user_name: userName,
//             password: password,
//             created_at: new Date().toISOString(),
//           },
//         ])
//         .select()
//         .maybeSingle();

//       if (insertError) throw insertError;

//       if (data) {
//         login(data, "user");
//         navigate("/dashboard");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "450px" }}>
//       <div className="card shadow p-4">
//         <h2 className="text-center mb-3">Create Account</h2>

//         {error && (
//           <div className="alert alert-danger text-center" role="alert">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Username</label>
//             <input
//               type="text"
//               className="form-control"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               placeholder="Enter username"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="At least 6 characters"
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Confirm Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Confirm password"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-100"
//             disabled={loading}
//           >
//             {loading ? "Creating Account..." : "Sign Up"}
//           </button>
//         </form>

//         <div className="text-center mt-3">
//           <p>
//             Already have an account?{" "}
//             <Link to="/login" className="text-decoration-none fw-bold">
//               Login here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../utils/supabase";

export function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!userName || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if (userName.length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data: existingUser, error: queryError } = await supabase
        .from("users")
        .select("*")
        .eq("user_name", userName)
        .maybeSingle();

      if (queryError) throw queryError;

      if (existingUser) {
        setError("Username already exists");
        setLoading(false);
        return;
      }

      const { data, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            id: `user_${Date.now()}`,
            user_name: userName,
            password: password,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .maybeSingle();

      if (insertError) throw insertError;

      if (data) {
        login(data, "user");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "calc(100vh - 64px)", // below fixed navbar
      width: "100vw",               // full screen width
      background: "linear-gradient(180deg, #f4f6f8 0%, #e8ecf1 100%)",
      overflow: "hidden",
      marginTop:50,
      padding: 0,
    }}
  >
    <div
      className="card shadow p-4"
      style={{
        width: "100%",
        maxWidth: "420px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    >
      <h2 className="text-center mb-3">Create Account</h2>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center mt-3">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none fw-bold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  </div>
);

}


