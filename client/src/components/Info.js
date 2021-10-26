import React from 'react';

function Info({ approvers, quorum }) {
  return (
    <div>
      <h3>Approvers:</h3>
      <ul>
        {approvers.map((approver, i) => (
          <li key={i}>{approver}</li>
        ))}
      </ul>
      <h3>Quorum: {quorum}</h3>
    </div>
  );
}

export default Info;
