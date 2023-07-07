import { useTypedSelector } from "./useTypedSelector";

export const useCurrentsUser = () => useTypedSelector((state)=> state.currentUser)