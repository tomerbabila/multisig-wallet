import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import { getWallet, getWeb3 } from './utils/utils.js';
import Header from './components/Header';
import Loader from './components/Loader';
import Info from './components/Info';
import NewTransfer from './components/NewTransfer';
import TransferList from './components/TransferList';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(false);
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();

      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
      setIsLoading(true);
    };
    init();
  }, []);

  const fetchTransfers = async () => {
    const transfers = await wallet.methods.getTransfers().call();
    setTransfers(transfers);
  };

  const createTransfer = async (transfer) => {
    await wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({ from: accounts[0] });
    await fetchTransfers();
  };

  const approveTransfer = async (transferId) => {
    await wallet.methods
      .approveTransfer(transferId)
      .send({ from: accounts[0] });
    await fetchTransfers();
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <div>
          <Info approvers={approvers} quorum={quorum} />
          <NewTransfer createTransfer={createTransfer} />
          <TransferList
            transfers={transfers}
            approveTransfer={approveTransfer}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
