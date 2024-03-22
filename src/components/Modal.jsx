import { useSetAtom } from "jotai";
import { uiAtom } from "../state";
import { useAtomValue } from "jotai";
import "../style/modal.scss";

const Modal = () => {
  const ui = useAtomValue(uiAtom);
  const setUi = useSetAtom(uiAtom);
  return (
    <div className="modal">
      <div className="modal-content">
        <button
          className="modal-btn"
          onClick={() =>
            setUi((prev) => ({
              ...prev,
              modal: false,
            }))
          }
        >
          X
        </button>

        <p>{ui.message}</p>
      </div>
    </div>
  );
};
export default Modal;
