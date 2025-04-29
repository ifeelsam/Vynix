'use client';

import { pharosChainRpc } from '@/components/store/config';
import { PrivyProvider } from '@privy-io/react-auth';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cm9xlc3oo01cml30m640hsclh"
      config={{
        appearance: {
          landingHeader: "Vynix",
          loginMessage: "Log in or Sign up to Vynix"
        },
        supportedChains: [pharosChainRpc],
        defaultChain: pharosChainRpc,
        embeddedWallets: {
          createOnLogin: 'all-users',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
