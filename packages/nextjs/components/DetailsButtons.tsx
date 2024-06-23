"use client";

import React from "react";
import { Tooltip } from "react-tooltip";

type Props = {
  details: string;
  id: number;
};

const DetailsButtons: React.FC<Props> = ({ id, details }) => {
  return (
    <div className="card-footer flex pb-6 justify-center">
      <button className="text-primary">Details →</button>
      <Tooltip id={`nft-${id}`} place="top">
        {details}
      </Tooltip>
    </div>
  );
};

export default DetailsButtons;
