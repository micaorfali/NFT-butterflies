import React, {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext,
} from "react";
import Web3 from "web3";
import { initOnboard } from "../services/onboard/services";

const OnboardContext = createContext();

const OnboardProvider = ({ children }) => {
  const [onboard, setOnboard] = useState(null);
  const [address, setAddress] = useState(null);
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
          new Web3(wallet.provider);
          console.log(`${wallet.name} connected!`);
          window.localStorage.setItem("selectedWallet", wallet.name);
        } else {
          setWallet({});
        }
      },
    });

    setOnboard(onboard);
  }, []);

  useEffect(() => {
    const retriveLocalStorage = async () => {
      const previouslySelectedWallet =
        window.localStorage.getItem("selectedWallet");
      console.log("retrive ls");
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
        ens,
        network,
        balance,
        wallet,
        onboard,
        linkWallet,
        resetWallet,
      }}
    >
      {children}
    </OnboardContext.Provider>
  );
};

export const useOnboardContext = () => useContext(OnboardContext);

export const useOnboard = () => {
  const { onboard } = useOnboardContext();
  return onboard;
};

export const useGetState = () => {
  const { onboard } = useOnboardContext();
  return onboard.getState();
};

export const useAddress = () => {
  const { address } = useOnboardContext();
  return address;
};

export const useBalance = () => {
  const { balance } = useOnboardContext();
  return balance;
};
export const useBalanceEth = () => {
  const { balance } = useOnboardContext();
  const _balance = +balance > 0 ? +balance / 10 ** 18 : +balance;
  return _balance;
};

export const useWallet = () => {
  const { wallet } = useOnboardContext();
  return wallet;
};

export const useNetwork = () => {
  const { network } = useOnboardContext();
  return network;
};

export const useWalletProvider = () => {
  const { provider } = useWallet() || {};
  return provider;
};

export default OnboardProvider;
