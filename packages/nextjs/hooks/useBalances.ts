import { useContext } from "react";
import { BalancesContext } from "../providers/BalancesProvider";

const useBalances = () => useContext(BalancesContext).balances;

export default useBalances;
