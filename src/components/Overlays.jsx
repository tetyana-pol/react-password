import { createPortal } from "react-dom";
import { useAtomValue } from "jotai";
import Modal from "./Modal";
import { uiAtom } from "../state";

const mountElement = document.getElementById("overlays");

export const Overlays = () => {
  const ui = useAtomValue(uiAtom);
  return createPortal(
    <>{ui.modal && <Modal message={ui.message} />}</>,
    mountElement
  );
};
