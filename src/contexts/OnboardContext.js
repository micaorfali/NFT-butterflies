import React, { useState, useEffect, createContext, useCallback } from "react";
import Web3 from "web3";
import { initOnboard } from "../services/onboard/services";

const OnboardContext = createContext();

let web3;

const OnboardProvider = ({ children }) => {
  const [onboard, setOnboard] = useState(null);
  const [address, setAddress] = useState(null);
  const [web3Instance, setWeb3Instance] = useState(null);
  const [ens, setEns] = useState(null);
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(null);
  const [wallet, setWallet] = useState({});

  const linkWallet = useCallback(async () => {
    try {
      const walletSelected = await onboard.walletSelect();
      if (walletSelected) {
        await onboard.walletCheck();
      }
    } catch (error) {
      console.log("notConnected", error);
    }
  }, [onboard]);

  const resetWallet = useCallback(async () => {
    try {
      await onboard.walletReset();
      window.localStorage.removeItem("selectedWallet");
    } catch (error) {
      console.log(error);
    }
  }, [onboard]);

  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      ens: setEns,
      network: setNetwork,
      balance: setBalance,
      wallet: (wallet) => {
        if (wallet.provider) {
          setWallet(wallet);
          web3 = new Web3(wallet.provider);
          setWeb3Instance(web3);
          window.localStorage.setItem("selectedWallet", wallet.name);
        } else {
          setWallet({});
        }
      },
    });

    setOnboard(onboard);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const retriveLocalStorage = async () => {
      const previouslySelectedWallet =
        window.localStorage.getItem("selectedWallet");
      if (previouslySelectedWallet && onboard) {
        await onboard.walletSelect(previouslySelectedWallet);
      }
    };
    retriveLocalStorage();
  }, [onboard]);

  return (
    <OnboardContext.Provider
      value={{
        address,
        setAddress,
        ens,
        setEns,
        network,
        setNetwork,
        balance,
        setBalance,
        wallet,
        setWallet,
        onboard,
        setOnboard,
        linkWallet,
        resetWallet,
        web3Instance,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
};

export { OnboardProvider, OnboardContext };
