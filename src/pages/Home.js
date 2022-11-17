import React from "react";
import WalletClient from "../components/WalletClient/WalletClient";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Hero from "../components/Hero/Hero";
import Mint from "../components/Mint/Mint";

const Home = () => {
  return (
    <>
      <Hero />
      <Grid2 container spacing={2}>
        <Grid2 xs={6}>
          <WalletClient />
        </Grid2>
        <Grid2 xs={6}>
          <Mint />
        </Grid2>
      </Grid2>
    </>
  );
};

export default Home;
