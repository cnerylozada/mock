import { Notification, notificationType } from "@/components/app/Notification";
import { useState } from "react";

export const useNotification = (onSuccess?: () => void) => {
  const [canShowNotification, setCanShowNotification] = useState(false);

  return {
    canShowNotification,
    setCanShowNotification,
    renderNotification: (
      operationType: notificationType,
      bodyMessage?: string
    ) => (
      <Notification
        operationType={operationType}
        canShowNotification
        setCanShowNotification={setCanShowNotification}
        onSuccess={onSuccess}
        bodyMessage={bodyMessage}
      />
    ),
  };
};
