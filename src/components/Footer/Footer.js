import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <h2 >Butterfly World</h2>
      <p className={styles.copyright}>© 2022 Butterfly World. Design with by Micaela Orfali.</p>
    </div>
  );
};

export default Footer;
