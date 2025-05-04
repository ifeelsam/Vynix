import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";
import { writeContract } from "@wagmi/core";
import { config } from "../components/store/config";
import abi from "../components/store/abi.json";
import { CONTRACT_ADDRESS } from "@/components/store/constant";
import { pharosDevnet } from "../components/store/config";
import { privateKeyToAccount } from "viem/accounts";
import { connect } from "@wagmi/core";
import { injected } from "wagmi/connectors";

interface IntegrationState {
  isWalletConnected: boolean;
  setIsWalletConnected: (state: boolean) => void;
  createAndListCard: (uri?: string, price?: number) => Promise<void>;
  transfer: (owner: string, to: string, token_id: number) => Promise<void>;
}

export const useIntegrationStore = create<IntegrationState>()(
  devtools(
    (set, get) => ({
      isWalletConnected: false,
      setIsWalletConnected: (state) => set({ isWalletConnected: state }),
      createAndListCard: async (uri: string, price: number) => {
        try {
            console.log("asassa");

            // await connect(config, {
            //     connector: injected(),
            //     chainId: pharosDevnet.id,
            //   });
    
          const result = await writeContract(config, {
            abi,
            address: CONTRACT_ADDRESS,
            functionName: "createAndListCard",
            args: [uri, BigInt(price)],
            chainId: pharosDevnet.id,
          });
          console.log("check (createAndListCard) result: "+JSON.stringify(result));
          return result;
        } catch (error) {
          console.error("Error creating and listing card:", JSON.stringify(error));
          throw error;
        }
      },
      
      transfer: async (owner: string, to: string, token_id: number) => {},
    }),
    {
      name: "Integration Store",
      enabled: true,
    }
  )
);
