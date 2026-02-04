import { useState } from "react";

export default function Help({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  return (
    <>
      <div
        className={`absolute bottom-0 md:right-0 right-0 w-100 flex flex-col justify-end items-end md:w-[50%] w-fit max-h-[70%] h-${isOpen ? "10%" : "0"} md:h-fit`}
      >
        <div className="w-[150px] h-fit">
          <button
            className="bg-green-600 w-full h-full p-2 text-foreground border-1 border-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            Help
          </button>
        </div>

        {isOpen ? (
          <div className="h-fit max-h-[70%] overflow-y-auto">
            <div className="bg-foreground w-full p-2 border-1">
              <button
                className="bg-blue-600 w-full h-full p-2 text-foreground border-1 border-foreground"
                onClick={() => setIsEnglish(!isEnglish)}
              >
                {isEnglish ? "Translate to Indonesian" : "Translate to English"}
              </button>
              {isEnglish ? (
                <>
                  {" "}
                  <h1 className="text-xl font-bold">
                    Hello! Welcome to ProPre Sim!
                  </h1>
                  <p>How to use..</p>
                  <div className="pl-5">
                    <ol className="list-decimal text-m">
                      <li>
                        First, Paste or Write on your Text Based ProPre Content
                        on the Left Side(Desktop)/Bottom Side(Mobile)
                      </li>
                      <li>The Results will be shown on the opposite side</li>
                      <li>
                        You may edit the attributes of the slides using the{" "}
                        <span className="font-bold">OPTIONS MENU</span> by
                        toggling the Options Button
                      </li>
                      <li className="text-amber-600 font-bold">
                        Please try and experiment with all of slide the
                        attributes controller
                      </li>
                      <li>
                        You are able to travel to specific line in your Text
                        Based Editor or specific slide in your Slide Based
                        Editor by{" "}
                        <span className="font-bold">DOUBLE CLICK</span> on a
                        Line in your Text Based Editor or your Slide
                      </li>
                    </ol>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <h1 className="text-xl font-bold">
                    Halo! Selamat datang di ProPre Sim
                  </h1>
                  <p>Cara Menggunakan</p>
                  <div className="pl-5">
                    <ol className="list-decimal text-m">
                      <li>
                        Pertama Paste atau Tulis konten berbasis Text Anda
                        (Notepad atau Sejenisnya) di bagian Kiri (PC/Desktop)
                        atau Bawah (Handphone)
                      </li>
                      <li>Hasilnya akan ditunjukan di arah berlawanan</li>
                      <li>
                        Anda boleh mengedit attribut Slidenya menggunakan{" "}
                        <span className="font-bold">Menu Opsi/Option</span>{" "}
                        dengan menekan tombol{" "}
                        <span className="font-bold">OPTIONS</span>
                      </li>
                      <li className="text-amber-600 font-bold">
                        Sangat disarankan untuk bereksperimen dengan kontroller
                        attribut slide
                      </li>
                      <li>
                        Anda dapat bepergian ke garis tertentu di Editor Teks
                        Anda atau Slide tertentu di Editor Slide Anda dengan
                        <span className="font-bold">DOUBLE CLICK</span> di salah
                        satu garis di Text Editor Anda atau slide di Slide
                        Editor Anda
                      </li>
                    </ol>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
