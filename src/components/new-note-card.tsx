import * as Dialog from "@radix-ui/react-dialog"; //import do radix para usar a caixa de dialogo do radix
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

export function NewNoteCard() {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");

  function handlerStartEditor() {
    setShouldShowOnboarding(false);
  }

  function handlerContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
    if (event.target.value === "") {
      setShouldShowOnboarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    console.log(content);
    toast.success("Nota criada com sucesso!");
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md flex flex-col gap-3 outline-none bg-slate-700 p-5 text-left space-y-3 overflow-hidden hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 ">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/*Faz com que um conteudo dentro dele não seja mostrado exatamente no mesmo local*/}
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        {/*a dive escura que cobre a tela quando usa um modal */}
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          {/*É o conteudo que vai aparecer no modal*/}
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400">
            <X className="size-5  hover:text-slate-100" />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{" "}
                  <button className="font-medium text-lime-400 hover:underline">
                    gravando uma nota
                  </button>{" "}
                  em audio ou se preferir{" "}
                  <button
                    onClick={handlerStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handlerContentChanged}
                ></textarea>
              )}
            </div>
            <button
              type="submit"
              className="w-full  py-4 bg-lime-400  text-center text-sm  text-lime-950 outline-none font-medium group"
            >
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
