"use client";
import { deleteSlideData, getSession } from "@/app/lib/action";
import { SlideButtonsProp } from "../../lib/type";
import { useRouter } from "next/navigation";
import { useState } from "react";
const DeleteSlideButton: React.FC<SlideButtonsProp> = ({ slideID }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const deleteSlide = async () => {
    try {
      const deletedSlide = await deleteSlideData(slideID);
      if (deletedSlide.success) {
        setIsOpen(!isOpen);
        router.refresh();
        return;
      }
      alert(`Failed to delete ${deletedSlide.message}`);
    } catch (error) {
      alert(`Failed to delete ${error}`);
      return;
    }
  };

  return (
    <>
      <button
        className="border-1 p-1 hover:bg-gray-300 bg-red-300/50 w-20 rounded-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        Delete
      </button>
      {isOpen ? (
        <>
          <div>
            <button
              className="border-1 p-1 hover:bg-red-300 bg-red-400/50 w-30 rounded-sm"
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
