import { GiSheikahEye } from "react-icons/gi";
import { Input } from "../../Input";
import { Modal, ModalBody } from "../Modal";

export function ReadProject() {
  return (
    <Modal
      btnIcon=<GiSheikahEye
        color="#6bd1ce"
        name="Visualizar"
        className="w-7 h-7"
      />
      btnClassName="cursor-pointer"
      modalId="Visualizar"
      modalClassName="w-2xl border-2 rounded-xl bg-neutral-800 border-[#55b196] p-3"
    >
      <ModalBody className="flex flex-col w-full gap-5">
        <h1 className="text-[#55b196] text-xl border-b-2 border-[#55b196]">
          Visualizar Projeto
        </h1>
        <div className="flex flex-col w-full px-8 py-3 gap-2">
          <Input
            placeholder="Nome"
            type="text"
            className="readolny border-2 rounded-md border-[#55b196] w-full h-8 bg-neutral-800 text-[#55b196] p-2"
            readOnly={true}
          />
          <Input
            placeholder="Categoria"
            type="text"
            className="border-2 rounded-md border-[#55b196] w-full h-8 bg-neutral-800 text-[#55b196] p-2"
            readOnly={true}
          />
          <Input
            placeholder="Prazo"
            type="date"
            className="border-2 rounded-md border-[#55b196] w-full h-8 bg-neutral-800 text-[#55b196] p-2"
            readOnly={true}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
