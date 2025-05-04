import { toast } from "sonner";
import {
  injected,
  useAccount,
  useBalance,
  useChainId,
  useConnect,
  useDisconnect,
} from "wagmi";

export interface Wallet {
  address: string;
  balance: number;
  isConnected: boolean;
  chainId: number;
  walletAdd: string;
}

export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({
    address,
    chainId,
  });
  const wallet: Wallet = {
    address: address ? `${address.slice(0, 5)}...${address.slice(-3)}` : "",
    balance: balanceData ? parseFloat(balanceData.formatted) : 0,
    walletAdd: address ?? "",
    isConnected,
    chainId,
  };
  const { connect, isPending: isconnectPending , isSuccess} = useConnect();
  const { disconnect, isPending: isDisconnectPendign , isSuccess: iSDisconnectSuccess} = useDisconnect();
  const isLoading = isconnectPending || isDisconnectPendign;

  const handleConnect = async () => {
    try {
      connect({ connector: injected() });
      if (isSuccess) {
        toast.success('Wallet Connected')
      } 
    } catch (e) {
      console.log(`error connecting wallet: ${e}`);
      toast.error("failed to connect, please try again");
    }
  };

  const handleDisconnect = async () => {
    try{
        disconnect()
        if (iSDisconnectSuccess) toast.success("Wallet disconnected Suceessfully")
    }
    catch (e) {
      console.log(`error disconnecting wallet: ${e}`);
      toast.error("failed to disconnect, please try again");
    }
  }
  return{
    wallet, 
    isLoading,
    connect: handleConnect,
    disconnect: handleDisconnect
  }
};