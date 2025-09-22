import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; 
import styles from './Cadastro.module.css';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nome: '',
    sobrenome: '',
    dataNascimento: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.nome || !formData.sobrenome) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        dataNascimento: formData.dataNascimento,
        email: formData.email,
        createdAt: new Date().toISOString()
      });

      console.log('Usuário cadastrado com sucesso! UID:', user.uid);
      
      navigate('/principal');

    } catch (firebaseError) {
      let message = 'Erro ao cadastrar. Tente novamente.';
      if (firebaseError.code === 'auth/email-already-in-use') {
        message = 'Este e-mail já está cadastrado.';
      } else if (firebaseError.code === 'auth/weak-password') {
        message = 'Senha muito fraca. Use pelo menos 6 caracteres.';
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
          <h1>Cadastro</h1>
          <div className={styles.logoLine}></div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@gmail.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha *</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
              minLength="6"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="nome">Nome *</label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Seu primeiro nome"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="sobrenome">Sobrenome *</label>
            <input
              id="sobrenome"
              name="sobrenome"
              type="text"
              value={formData.sobrenome}
              onChange={handleChange}
              placeholder="Seu sobrenome"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="dataNascimento">Data de Nascimento</label>
            <input
              id="dataNascimento"
              name="dataNascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={handleChange}
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
                Cadastrando...
              </>
            ) : (
              'Cadastrar'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Já tem conta?{' '}
            <Link to="/" className={styles.link}>
              Faça login aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}