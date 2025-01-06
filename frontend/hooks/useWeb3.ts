import { useState, useEffect } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

const providerOptions = {
  // Add provider options here if needed
};

export function useWeb3() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const web3Modal = new Web3Modal({
      network: "localhost",
      cacheProvider: true,
      providerOptions
    });

    const connectWallet = async () => {
      try {
        const provider = await web3Modal.connect();
        const web3Instance = new Web3(provider);
        
        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.getChainId();
        
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setChainId(networkId);
        setError(null);

        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts: string[]) => {
          setAccount(accounts[0]);
        });

        // Subscribe to chainId change
        provider.on("chainChanged", (chainId: number) => {
          setChainId(chainId);
        });

      } catch (err) {
        setError("Failed to connect to wallet");
        console.error(err);
      }
    };

    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      network: "localhost",
      cacheProvider: true,
      providerOptions
    });

    try {
      const provider = await web3Modal.connect();
      const web3Instance = new Web3(provider);
      
      const accounts = await web3Instance.eth.getAccounts();
      const networkId = await web3Instance.eth.getChainId();
      
      setWeb3(web3Instance);
      setAccount(accounts[0]);
      setChainId(networkId);
      setError(null);
    } catch (err) {
      setError("Failed to connect to wallet");
      console.error(err);
    }
  };

  const disconnectWallet = async () => {
    const web3Modal = new Web3Modal({
      network: "localhost",
      cacheProvider: true,
      providerOptions
    });
    
    web3Modal.clearCachedProvider();
    setWeb3(null);
    setAccount(null);
    setChainId(null);
  };

  return {
    web3,
    account,
    chainId,
    error,
    connectWallet,
    disconnectWallet
  };
}
