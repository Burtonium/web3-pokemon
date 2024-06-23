/* eslint-disable @next/next/no-img-element */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useDisconnect } from "wagmi";

const Disconnect = () => {
  const { disconnect } = useDisconnect();

  return (
    <div>
      <button className="btn btn-primary" onClick={() => disconnect()}>
        Disconnect
      </button>
    </div>
  );
};

export default Disconnect;
