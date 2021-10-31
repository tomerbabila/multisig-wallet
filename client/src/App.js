import React, { useEffect, useState } from 'react';
import './styles/App.scss';
import { getWallet, getWeb3 } from './utils/utils.js';
import Header from './components/Header';
import Loader from './components/Loader';
import Info from './components/Info';
import NewTransfer from './components/NewTransfer';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(false);
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();

      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setIsLoading(true);
    };
    init();
  }, []);

  const createTransfer = (transfer) => {
    wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({ from: accounts[0] });
  };

  return (
    <div>
      <Header />
      {isLoading ? <Info approvers={approvers} quorum={quorum} /> : <Loader />}
      <NewTransfer createTransfer={createTransfer} />
    </div>
  );
}

export default App;
