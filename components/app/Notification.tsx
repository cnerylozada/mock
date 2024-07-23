export const Notification = ({
  operationType,
}: {
  operationType: "creation" | "edition";
}) => {
  return (
    <div className="fixed top-3 right-3">
      <div className="p-2 w-[300px] bg-green-100 border-2 rounded-md border-gray-300">
        <div>Exito!</div>
        {operationType === "creation" && <div>Creacion exitosa :D</div>}
        {operationType === "edition" && <div>Edicion exitosa :D</div>}
      </div>
    </div>
  );
};
