"use client";
import { deleteSlideData } from "@/app/lib/action";
import { SlideButtonsProp } from "../../lib/type";
const DeleteSlideButton: React.FC<SlideButtonsProp> = ({ slideID }) => {
  return (
    <>
      <button
        className="border-1 p-1 hover:bg-gray-300 bg-red-300"
        onClick={() => deleteSlideData(slideID)}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteSlideButton;
