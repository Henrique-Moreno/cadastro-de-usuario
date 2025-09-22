import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import styles from './Principal.module.css';

export default function Principal() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se usuário está autenticado
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        
        navigate('/');
        return;
      }
      
      try {
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            nome: data.nome,
            sobrenome: data.sobrenome,
            dataNascimento: data.dataNascimento
          });
        } else {
          navigate('/cadastro');
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informada';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return null; 
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.welcome}>
            Olá, {userData.nome} {userData.sobrenome}!
          </h1>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Sair
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Suas Informações</h2>
            <div className={styles.cardIcon}>👤</div>
          </div>

          <div className={styles.cardContent}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Nome Completo:</span>
              <span className={styles.value}>
                {userData.nome} {userData.sobrenome}
              </span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.infoItem}>
              <span className={styles.label}>Data de Nascimento:</span>
              <span className={styles.value}>
                {formatDate(userData.dataNascimento)}
              </span>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>1</div>
                <div className={styles.statLabel}>Conta Ativa</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>✓</div>
                <div className={styles.statLabel}>Verificado</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.btnSecondary}>
            Editar Perfil
          </button>
          <button className={styles.btnOutline}>
            Configurações
          </button>
        </div>
      </main>
    </div>
  );
}