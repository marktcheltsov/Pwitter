import { useTypedSelector } from "./useTypedSelector";

export const useUsers = () => useTypedSelector((state)=> state.users)