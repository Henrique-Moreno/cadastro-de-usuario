import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; 
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Preencha e-mail e senha');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      console.log('Login realizado com sucesso!');
      
      navigate('/principal');

    } catch (firebaseError) {
      
      let message = 'Erro ao fazer login. Tente novamente.';
      if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
        message = 'E-mail ou senha incorretos. Verifique os dados.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        message = 'E-mail inválido.';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <h1>Login</h1>
          <div className={styles.logoLine}></div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button 
            type="submit" 
            className={`${styles.btnPrimary} ${loading ? styles.loading : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Entrando...
              </>
            ) : (
              'Acessar'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Não tem conta?{' '}
            <Link to="/cadastro" className={styles.link}>
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}