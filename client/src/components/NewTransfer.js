import React, { useState } from 'react';

function NewTransfer({ createTransfer }) {
  const [transfer, setTransfer] = useState(undefined);

  const updateTransfer = (e, field) => {
    const { value } = e.target;
    setTransfer({ ...transfer, [field]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    createTransfer(transfer);
  };

  return (
    <div>
      <h3>New Transaction</h3>
      <form onSubmit={(e) => submit(e)}>
        <label htmlFor='amount'>Amount</label>
        <input
          id='amount'
          type='text'
          onClick={(e) => updateTransfer(e, 'amount')}
        />
        <label htmlFor='to'>To</label>
        <input id='to' type='text' onClick={(e) => updateTransfer(e, 'to')} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default NewTransfer;
