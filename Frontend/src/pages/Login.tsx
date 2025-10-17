import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";

export function Login() {
  return (
    <div className="flex w-full h-full justify-center items-center bg-[url(src/assets/RPG-toDo-List-bg.png)] bg-cover">
      <Card
        className={`relative flex items-start border-2 rounded-xl border-[#55b196] max-w-200 min-w-130 h-190  bg-[url(src/assets/card-login-bg.jpg)] bg-cover bg-center p-8`}
      >
        <div className="absolute inset-0 bg-[#240917]/80 rounded-xl" />
        <div className="relative flex flex-col gap-48 w-full">
          <h1 className="text-[#55b196] text-3xl text-center border-b-1">
            Login
          </h1>
          <div className="relative flex flex-col w-full gap-3 p-2">
            <Input
              placeholder="email@mail.com"
              type="email"
              className="border-2 rounded-md border-[#55b196] w-full h-8 bg-black/80 text-[#55b196] p-2"
            />
            <Input
              placeholder="**************"
              type="password"
              className="border-2 rounded-md border-[#55b196] w-full h-8 bg-black/80 text-[#55b196] p-2"
            />
            <div className="relative flex gap-2 h-8">
              <Button
                label="Cadastrar"
                className="bg-[#559FB1] rounded-xl w-53"
                onClick={() => {
                  alert("Clicou em cadastrar");
                }}
              />
              <Button
                label="Entrar"
                className="bg-[#55b196] rounded-xl w-53"
                onClick={() => {
                  alert("Clicou em entrar");
                }}
              />
            </div>
            <a className="text-[#55b196] underline" href="/">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
