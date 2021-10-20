const Wallet = artifacts.require('Wallet');

contract('Wallet', (accounts) => {
  let wallet;

  beforeEach(async () => {
    wallet = await Wallet.new([accounts[0], accounts[1], accounts[2]], 2);

    await web3.eth.sendTransaction({
      from: accounts[0],
      to: wallet.address,
      value: 100,
    });
  });

  it('should have correct approvers and quorum', async () => {
    const approvers = await wallet.getApprovers();
    const quorum = await wallet.quorum();

    assert(approvers.length === 3);
    assert(approvers[0] === accounts[0]);
    assert(approvers[1] === accounts[1]);
    assert(approvers[2] === accounts[2]);
    assert(quorum.toNumber() === 2);
  });

  it('should create transfers', async () => {
    await wallet.createTransfer(100, accounts[3], { from: accounts[0] });
    const transfers = await wallet.getTransfers();
    assert(transfers.length === 1);
    assert(transfers[0].id === '0');
    assert(transfers[0].amount === '100');
    assert(transfers[0].to === accounts[3]);
    assert(transfers[0].approvals === '0');
    assert(transfers[0].sent === false);
  });
});
