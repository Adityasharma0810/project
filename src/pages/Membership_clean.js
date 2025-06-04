import React, { useEffect, useState } from 'react';

function Membership() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch current user from backend API for secure session management
    fetch('http://localhost:5000/api/current_user', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Not authenticated');
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setUser(null);
        setLoading(false);
        setError(err.message);
      });
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  if (loading) {
    return (
      <section className="membership-section" style={{ padding: '3rem', maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="membership-section" data-aos="fade-up" style={{ padding: '3rem', maxWidth: '600px', margin: '2rem auto', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1.5rem' }}>Join Codeunia Membership</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {!user ? (
        <>
          <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '2rem', textAlign: 'center' }}>
            Become a member to access exclusive workshops, hackathons, mentorship, and networking opportunities.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleLogin}
              style={{
                backgroundColor: '#4285F4',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(66, 133, 244, 0.5)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = '#357ae8')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = '#4285F4')}
            >
              Sign in with Google
            </button>
          </div>
        </>
      ) : (
        <>
          <p style={{ fontSize: '1.2rem', color: '#333', textAlign: 'center' }}>
            Welcome, <strong>{user.name}</strong>!
          </p>
          <p style={{ fontSize: '1.1rem', color: '#555', textAlign: 'center', marginBottom: '2rem' }}>
            Your unique Member ID is: <strong style={{ color: '#4285F4' }}>{user.member_id}</strong>
          </p>
          <p style={{ fontSize: '1rem', color: '#666', textAlign: 'center', marginBottom: '2rem' }}>
            Enjoy access to exclusive workshops, hackathons, mentorship, and networking opportunities.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => { window.location.href = 'http://localhost:5000/logout'; }}
              style={{
                backgroundColor: '#d9534f',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.5rem',
                fontSize: '1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(217, 83, 79, 0.5)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = '#c9302c')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = '#d9534f')}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Membership;
