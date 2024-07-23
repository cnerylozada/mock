import { Notification } from "@/components/app/Notification";
import { useState } from "react";

export const useNotification = () => {
  const [canShowNotification, setCanShowNotification] = useState(false);
  return {
    canShowNotification,
    setCanShowNotification,
    renderNotification: (operationType: "creation" | "edition") => (
      <Notification operationType={operationType} />
    ),
  };
};
