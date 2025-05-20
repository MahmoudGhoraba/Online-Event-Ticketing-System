import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#444',
      color: '#fff',
      padding: '40px 0',
      fontFamily: 'sans-serif',
      marginTop: 'auto',
      width: '100%',
      position: 'relative',
    },
    container: {
      width: '100%',
      display: 'flex',
      padding: '0',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    contentWrapper: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: '0 20px', // optional
    },
    
    column: {
      flex: '1',
      minWidth: '180px',
      margin: '10px',
    },
    logoBox: {
      backgroundColor: '#777',
      color: '#fff',
      padding: '20px',
      borderRadius: '5px',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '24px',
    },
    circleContainer: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
    },
    circle: {
      width: '40px',
      height: '40px',
      backgroundColor: '#ddd',
      borderRadius: '50%',
    },
    bar: {
      height: '14px',
      backgroundColor: '#666',
      marginBottom: '10px',
      borderRadius: '2px',
    },
    block: {
      height: '40px',
      backgroundColor: '#aaa',
      marginBottom: '15px',
      borderRadius: '4px',
    },
    input: {
      backgroundColor: '#555',
      color: '#aaa',
      padding: '10px',
      border: '1px solid #666',
      borderRadius: '5px',
      marginBottom: '10px',
      width: '90%',
    },
    button: {
      backgroundColor: '#fff',
      color: '#000',
      padding: '10px',
      border: 'none',
      borderRadius: '10px',
      fontWeight: 'bold',
      width: '100%',
    },
    hr: {
      margin: '40px 0 20px 0',
      border: 'none',
      height: '1px',
      backgroundColor: '#666',
      width: '100%',
    },
    copyright: {
      textAlign: 'center',
      color: '#ccc',
      padding: '0 20px',
      width: '100%',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          {/* Logo Column */}
          <div style={styles.column}>
            <div style={styles.logoBox}>Logo</div>
            <div style={styles.circleContainer}>
              <div style={styles.circle}></div>
              <div style={styles.circle}></div>
              <div style={styles.circle}></div>
              <div style={styles.circle}></div>
            </div>
          </div>

          {/* Columns */}
          {[1, 2, 3].map((_, i) => (
            <div key={i} style={styles.column}>
              <div style={styles.block}></div>
              <div style={styles.bar}></div>
              <div style={styles.bar}></div>
              <div style={styles.bar}></div>
            </div>
          ))}

          {/* Input & Button Column */}
          <div style={styles.column}>
            <input type="text" placeholder="Label" style={styles.input} />
            <button style={styles.button}>Button</button>
          </div>
        </div>
      </div>

      <hr style={styles.hr} />

      <div style={styles.copyright}>
        Spaghetti's © 2025. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;