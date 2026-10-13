"use client";

import { useState } from "react";
import { useMyModel } from "../hooks/use-my-model";
import { ModelPickerSheet } from "./model-picker-sheet";
import { CurrentModelPill } from "./current-model-pill";
import { RememberedModelPill } from "./remembered-model-pill";
import { ChooseModelPill } from "./choose-model-pill";

/** Обрана модель — червона з ×; запам'ятована — у один тап; жодної — запрошення обрати. */
export const MyModelBar = () => {
  const { current, remembered, choose, clear } = useMyModel();
  const [open, setOpen] = useState(false);
  const openPicker = () => setOpen(true);

  return (
    <div className="flex min-w-0 flex-1 items-center md:flex-none">
      {current ? (
        <CurrentModelPill name={current.name} onChange={openPicker} onClear={clear} />
      ) : remembered ? (
        <RememberedModelPill name={remembered.name} onShow={() => choose(remembered)} onChange={openPicker} />
      ) : (
        <ChooseModelPill onChoose={openPicker} />
      )}
      <ModelPickerSheet open={open} onOpenChange={setOpen} />
    </div>
  );
};
