import { useTypedSelector } from "./useTypedSelector";

export const useNotifications = () => useTypedSelector((state)=> state.notifications)