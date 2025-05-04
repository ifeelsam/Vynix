"use client";

import { pharosChainRpc } from "@/components/store/config";
import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "@privy-io/wagmi";
import { config } from "../components/store/config";

export default function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        {" "}
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
