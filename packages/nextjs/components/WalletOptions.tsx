import * as React from "react";
import { uniqBy } from "lodash";
import { useConnect } from "wagmi";

// ...

const WalletOptions = () => {
  const { connectors, connect } = useConnect();

  // Use uniqBy to remove duplicate connectors based on their uid
  const uniqueConnectors = uniqBy(connectors, "id");

  return (
    <details className="dropdown dropdown-bottom dropdown-end">
      <summary className="btn btn-primary m-1">Connect</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {uniqueConnectors.map(connector => (
          <li key={connector.uid}>
            <button key={connector.uid} onClick={() => connect({ connector })}>
              {connector.name}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default WalletOptions;
