import { Notification, notificationType } from "@/components/app/Notification";
import { useState } from "react";

export const useNotification = (onSuccess?: () => void) => {
  const [canShowNotification, setCanShowNotification] = useState(false);

  return {
    canShowNotification,
    setCanShowNotification,
    renderNotification: (
      operationType: notificationType,
      errorMessage?: string
    ) => (
      <Notification
        operationType={operationType}
        canShowNotification
        setCanShowNotification={setCanShowNotification}
        onSuccess={onSuccess}
        errorMessage={errorMessage}
      />
    ),
  };
};
