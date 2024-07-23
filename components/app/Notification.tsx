import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect } from "react";

export type notificationType = "creation" | "edition" | "error";
export const Notification = ({
  operationType,
  canShowNotification,
  setCanShowNotification,
  onSuccess,
  errorMessage,
}: {
  operationType: notificationType;
  canShowNotification: boolean;
  setCanShowNotification: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => void;
  errorMessage?: string;
}) => {
  useEffect(() => {
    const renderNotification = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setCanShowNotification(false);
    };
    renderNotification().then(() => {
      if (onSuccess && operationType !== "error") onSuccess();
    });
  }, []);

  if (!canShowNotification) return null;
  return (
    <div className="fixed top-3 right-3">
      <div
        className={clsx(`p-2 w-[300px] border-2 rounded-md border-gray-300`, {
          "bg-green-200": operationType === "creation",
          "bg-blue-200": operationType === "edition",
          "bg-red-200": operationType === "error",
        })}
      >
        <div>{operationType !== "error" ? "Exito" : "Error"}</div>
        {operationType === "creation" && <div>Creacion exitosa :D</div>}
        {operationType === "edition" && <div>Edicion exitosa :D</div>}
        {!!errorMessage && <div>{errorMessage}</div>}
      </div>
    </div>
  );
};
