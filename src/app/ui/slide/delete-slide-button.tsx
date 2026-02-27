"use client";
import { deleteSlideData } from "@/app/lib/action";
import { SlideButtonsProp } from "../../lib/type";
import { useRouter } from "next/navigation";
import { useState } from "react";
const DeleteSlideButton: React.FC<SlideButtonsProp> = ({ slideID }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const deleteSlide = () => {
    deleteSlideData(slideID);
    setIsOpen(!isOpen);
    router.refresh();
  };

  return (
    <>
      <button
        className="border-1 p-1 hover:bg-gray-300 bg-red-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        Delete
      </button>
      {isOpen ? (
        <>
          <div>
            <button
              className="border-1 p-1 hover:bg-gray-300 bg-red-400"
              onClick={deleteSlide}
            >
              Confirm Delete
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DeleteSlideButton;
