import React, { useContext } from "react";
import { OnboardContext } from "../../contexts/OnboardContext";
import { truncateWeb3Address } from "../../services/onboard/helpers";

const WalletButton = () => {
  const { onboard, address, wallet, linkWallet, resetWallet } =
    useContext(OnboardContext);

  return onboard ? (
    <div>
      {!wallet.provider ? (
        <div>
          <div>
            <div>
              <h4>Connect to Wallet</h4>
              <p>Please connect your preferred wallet to use the app.</p>
            </div>
          </div>
          <div>
            <button onClick={linkWallet}>Connect</button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div>
              {wallet.icons && (
                <img src={wallet.icons.iconSrc} alt={wallet.name} />
              )}
            </div>
            <div>
              <h4>Connected with {wallet.name}</h4>
              {address ? (
                <p>{truncateWeb3Address(address)}</p>
              ) : (
                <p>Please connect your {wallet.name} wallet to use the app.</p>
              )}
            </div>
          </div>
          <div>
            {address ? (
              <>
                <button onClick={onboard.walletSelect}>Switch</button>
                <button onClick={resetWallet}>Disconnect</button>
              </>
            ) : (
              <>
                <button onClick={linkWallet}>Connect</button>
                <button onClick={resetWallet}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default WalletButton;
