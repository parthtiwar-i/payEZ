import { P2PTransactions } from "../../components/p2pTransactions";
import { TransferMoney } from "../../components/transferMoney";
import { getP2PTransactions } from "../../lib/actions/getP2PTransactions";

export default async function Page() {
  const transactions = await getP2PTransactions();

  if ("message" in transactions) {
    //handle message
    return null;
  }

  return (
    <div className="w-full pl-0 md:pl-64 transition-all duration-300 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
          P2P Transfer
        </h1>
        <div className=" w-1/2 mb-8">
          {/* Transfer Money to the person */}
          <TransferMoney />
          {/* SHow all p2p transactions */}
        </div>
        <P2PTransactions transactions={transactions || {}} />
      </div>
    </div>
  );
}
