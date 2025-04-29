import { addRpcUrlOverrideToChain } from '@privy-io/react-auth';
import {http, createConfig} from '@wagmi/core';
import { defineChain } from 'viem'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = 'df1b443fd552341b785dd2ba56fbae1e';

export const pharosDevnet = defineChain({
  id: 50002,
  name: 'Pharos',
  network: 'pharos-devnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://devnet.dplabs-internal.com'],
      webSocket: ['wss://devnet.dplabs-internal.com'],
    },
    public: {
      http: ['https://devnet.dplabs-internal.com'],
      webSocket: ['wss://devnet.dplabs-internal.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Pharos Explorer',
      url: 'https://pharosscan.xyz/',
    },
  },
  testnet: true,
})


export const config = createConfig({
    chains: [pharosDevnet],
    connectors: [
      injected(),
      walletConnect({ projectId }),
      metaMask(),
      safe(),
    ],
    transports: {
        [pharosDevnet.id]: http()
    }
})

export const pharosChainRpc = addRpcUrlOverrideToChain(
  pharosDevnet, 
  'https://devnet.dplabs-internal.com'
);