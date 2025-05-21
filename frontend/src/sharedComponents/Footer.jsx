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
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    contentWrapper: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: '0 20px',
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
      justifyContent: 'center',
      gap: '10px',
      marginTop: '20px',
    },
    circle: {
      width: '40px',
      height: '40px',
      backgroundColor: '#ddd',
      borderRadius: '50%',
    },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: '18px',
      marginBottom: '10px',
    },
    link: {
      marginBottom: '8px',
      display: 'block',
      color: '#ccc',
      textDecoration: 'none',
      cursor: 'pointer',
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
            <div style={styles.logoBox}>🎟️ Spaghetti's</div>
            <div style={styles.circleContainer}>
              <div style={styles.circle}></div>
              <div style={styles.circle}></div>
              <div style={styles.circle}></div>
              <div style={styles.circle}></div>
            </div>
          </div>

          {/* Information Columns */}
          <div style={styles.column}>
            <div style={styles.sectionTitle}>About Us</div>
            <span style={styles.link}>Our Story</span>
            <span style={styles.link}>Team</span>
            <span style={styles.link}>Careers</span>
          </div>

          <div style={styles.column}>
            <div style={styles.sectionTitle}>Support</div>
            <span style={styles.link}>Contact</span>
            <span style={styles.link}>FAQs</span>
            <span style={styles.link}>Help Center</span>
          </div>

          <div style={styles.column}>
            <div style={styles.sectionTitle}>Legal</div>
            <span style={styles.link}>Privacy Policy</span>
            <span style={styles.link}>Terms of Service</span>
            <span style={styles.link}>Cookie Policy</span>
          </div>

          {/* Subscribe Column */}
          <div style={styles.column}>
            <div style={styles.sectionTitle}>Subscribe</div>
            <input type="text" placeholder="Your email" style={styles.input} />
            <button style={styles.button}>Subscribe</button>
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
