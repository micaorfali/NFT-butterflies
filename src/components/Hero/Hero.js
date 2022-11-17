import React from "react";
import styles from "./Hero.module.css";


const Hero = () => {
  return (
    <div className={styles.containerHero}>
      <div className={styles.heroimage}>
        <div className={styles.herotext}>
          <h1>Butterfly World</h1>
          <p>Welcome to the amazing world that combines nature and Artificial Intelligence</p>
          <a className={styles.CTA} href='#mintNow'>Mint now</a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
