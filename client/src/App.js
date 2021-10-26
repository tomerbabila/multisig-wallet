import React, { useEffect, useState } from 'react';
import { getWallet, getWeb3 } from './utils';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [wallet, setWallet] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);

      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
    };
    init();
  }, []);

  return <div>Multisig Wallet</div>;
}

export default App;
