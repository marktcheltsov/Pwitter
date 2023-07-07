import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { useEffect } from "react";

const Notifications = () => {

  return ( 
    <>
      <Header showBackArrow label="Notifications" />
      <NotificationsFeed />
    </>
   );
}
 
export default Notifications