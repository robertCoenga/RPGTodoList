import { GiDeathZone } from "react-icons/gi";
import { Button } from "../../Button";
import { Modal, ModalBody, ModalFooter } from "../Modal";

export function DeleteProject() {
  return (
    <Modal
      btnIcon=<GiDeathZone color="#BE002A" name="Deletar" className="w-7 h-7" />
      btnClassName="cursor-pointer"
      modalId="Deletar"
      modalClassName="w-2xl border-2 rounded-xl bg-neutral-800 border-[#55b196] p-3"
    >
      <ModalBody className="flex flex-col w-full gap-5">
        <h1 className="text-[#55b196] text-xl border-b-2 border-[#55b196]">
          Deletar Projeto
        </h1>
        <div className="flex flex-col w-full px-8 py-3 gap-2">
          <p> Tem certeza que deseja deletar o projeto?</p>
        </div>
      </ModalBody>
      <ModalFooter
        btnCloseLabel="Não"
        className="flex flex-row gap-2 justify-end"
      >
        <Button
          label="Sim"
          className="rounded-xl bg-green-500 w-20 h-7"
          onClick={() => alert("Deletado")}
        />
      </ModalFooter>
    </Modal>
  );
}
