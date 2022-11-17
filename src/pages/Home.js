import React from "react";
import WalletClient from "../components/WalletClient/WalletClient";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Hero from "../components/Hero/Hero";
import Mint from "../components/Mint/Mint";
import Banner from "../components/Banner/Banner";
import About from "../components/About/About";
import AboutImage from "../components/AboutImage/AboutImage";


const Home = () => {
  return (
    <>
      <Hero />
      <Banner />
      <Grid2 container spacing={2}>
        <Grid2 xs={6}>
          <WalletClient />
        </Grid2>
        <Grid2 xs={6}>
          <Mint />
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 xs={5} xsOffset={1}>
          <About />
        </Grid2>
        <Grid2 xs={5}>
          <AboutImage />
        </Grid2>
      </Grid2>

    </>
  );
};

export default Home;
