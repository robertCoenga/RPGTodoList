import { GiSwordSmithing } from "react-icons/gi";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Modal, ModalBody, ModalFooter } from "../Modal";

export function CreateProject() {
  return (
    <Modal
      btnIcon=<GiSwordSmithing className="w-8 h-8 text-[#F59E0B]" />
      btnClassName="border-2 border-[#F59E0B] cursor-pointer bg-neutral-800 h-11 w-30 px-10 rounded-4xl"
      modalId="Cadastrar"
      modalClassName="w-2xl border-2 rounded-xl bg-neutral-800 border-[#55b196] p-3"
    >
      <ModalBody className="flex flex-col w-full gap-5">
        <h1 className="text-[#55b196] text-xl border-b-2 border-[#55b196]">
          Criar Projeto
        </h1>
        <div className="flex flex-col w-full px-8 py-3 gap-2">
          <Input
            placeholder="Nome"
            type="text"
            className="border-2 rounded-md border-[#55b196] w-full h-8 bg-neutral-800 text-[#55b196] p-2"
          />
          <Input
            placeholder="Categoria"
            type="text"
            className="border-2 rounded-md border-[#55b196] w-full h-8 bg-neutral-800 text-[#55b196] p-2"
          />
          <Input
            placeholder="Prazo"
            type="date"
            className="border-2 rounded-md border-[#55b196] w-full h-8 bg-neutral-800 text-[#55b196] p-2"
          />
        </div>
      </ModalBody>
      <ModalFooter className="flex flex-row gap-2 justify-end">
        <Button
          label="Criar"
          className="rounded-xl bg-green-500 w-20 h-7"
          onClick={() => alert("Cadastrou")}
        />
      </ModalFooter>
    </Modal>
  );
}
