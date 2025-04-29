"use client"

import { useEffect, useState } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { formatEther } from 'viem/utils';
import { Button } from '@/components/ui/button';

function WalletBalance() {
  const { wallets, ready } = useWallets();
  const {login} = usePrivy()
  const [balance, setBalance] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Find the embedded wallet
  const embeddedWallet = wallets?.find(wallet => 
    wallet.walletClientType === 'privy' && wallet.connectorType === 'embedded'
  );

  const getBalance = async () => {
    if (!embeddedWallet) {
      setError('No embedded wallet found');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Get the provider for the embedded wallet
      const provider = await embeddedWallet.getEthereumProvider();
      
      // Get the wallet address
      const walletAddress = embeddedWallet.address;
      setAddress(walletAddress);
      
      // Get the wallet balance using EIP-1193 request
      const balanceHex = await provider.request({
        method: 'eth_getBalance',
        params: [walletAddress, 'latest'],
      });
      // Convert hex string (e.g., '0x...') to BigInt
      const balanceInWei = BigInt(balanceHex);
      const formattedBalance = formatEther(balanceInWei);
      setBalance(formattedBalance);
    } catch (err) {
      console.error('Error getting balance:', err);
      if (err instanceof Error) {
        setError(`Failed to get balance: ${err.message}`);
      } else {
        setError('An unknown error occurred while fetching the balance.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch balance when wallet is ready
  useEffect(() => {
    if (ready && embeddedWallet) {
      getBalance();
    }
  }, [ready, embeddedWallet]);

//   if (!ready) {
//     return <div>Loading wallets...</div>;
//   }

//   if (!embeddedWallet) {
//     return <div>No embedded wallet found. Please ensure you've configured Privy to create embedded wallets.</div>;
//   }

  return (
    <div>
      <h2>Embedded Wallet Details</h2>
        <Button onClick={() => login({loginMethods : ["google", "email"]})}>login</Button> 
      <div>
        <strong>Address:</strong> {address || 'Loading...'}
      </div>
      
      <div>
        <strong>Balance:</strong> {loading ? 'Loading...' : (balance ? `${balance} PHAR` : 'Unknown')}
      </div>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <button onClick={getBalance} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Balance'}
      </button>
    </div>
  );
}

export default WalletBalance;
