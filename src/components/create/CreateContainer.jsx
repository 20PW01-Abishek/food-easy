import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";

import { categories } from "../../utils/data";
import { saveItem } from "../../utils/firebaseFunctions";
import Loader from "../layout/Loader";

const CLOUDINARY_CLOUD_NAME = import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env
  .REACT_APP_CLOUDINARY_UPLOAD_PRESET;

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  const uploadImage = async (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      const data = await res.json();
      setImageAsset(data.secure_url);
      setIsLoading(false);
      setFields(true);
      setMsg("Image uploaded successfully.");
      setAlertStatus("success");
      setTimeout(() => setFields(false), 4000);
    } catch (error) {
      console.error(error);
      setFields(true);
      setMsg("Error occurred while uploading, please try again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const deleteImage = () => {
    setImageAsset(null);
    setFields(true);
    setMsg("Image cleared. Upload a new one.");
    setAlertStatus("success");
    setTimeout(() => setFields(false), 4000);
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if ((!title && !calories && !price && !imageAsset, !category)) {
        setFields(true);
        setMsg("Required fields (*) can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          // eslint-disable-next-line react-hooks/purity -- safe: called from event handler
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };

        saveItem(data);

        setIsLoading(false);
        setFields(true);
        setMsg("Data uploading completed successfully");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);

        clearData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCalories("Select Category");
  };

  return (
    <AnimatePresence>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[80%] flex flex-col items-center justify-center p-2 border gap-4 border-border rounded-lg">
          {fields && (
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`w-full p-2 rounded-lg text-center ${
                alertStatus === "danger"
                  ? "bg-error text-errorMuted"
                  : "bg-success text-successMuted"
              }`}
            >
              {msg}
            </motion.p>
          )}

          <div className="w-full py-2 border-b border-border flex items-center gap-2">
            <MdFastfood className="text-muted text-xl" />
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give me a title..."
              className="w-full h-full text-lg  bg-transparent outline-none order-none placeholder:text-muted"
            />
          </div>

          <div className="w-full">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none w-full text-base border-b-2 border-border p-2 rounded-md cursor-pointer"
            >
              <option value="other" className="bg-white">
                Select Category
              </option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={category.urlParamName}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="group flex justify-center items-center flex-col border-2 border-dotted border-border w-full h-225 md:h-300 cursor-pointer">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {!imageAsset ? (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <MdCloudUpload className="text-muted group-hover:text-headingColor text-3xl" />
                      <p className="text-muted group-hover:text-headingColor">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                ) : (
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-error text-xl
                  cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-3">
            <div className="w-full py-2 border-b border-border flex items-center gap-2">
              <MdFoodBank className="text-muted text-2xl" />
              <input
                type="text"
                required
                placeholder="Give me a calories..."
                className="w-full h-full text-lg  bg-transparent outline-none order-none placeholder:text-muted"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>

            <div className="w-full py-2 border-b border-border flex items-center gap-2">
              <MdAttachMoney className="text-muted text-2xl" />
              <input
                type="text"
                required
                placeholder="Add the price..."
                className="w-full h-full text-lg  bg-transparent outline-none order-none placeholder:text-muted"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center w-full">
            <button
              type="button"
              className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-success px-12 py-2 rounded-lg text-lg text-white font-semibold"
              onClick={saveDetails}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CreateItem;
