"use client";
import React, { useState } from "react";
import Select from "react-select";
import { RxCross1 } from "react-icons/rx";
import useListModal from "@/hooks/useListModal";
import getCategoryData from "@/libs/getCategoryData";
import ImageUpload from "./ImageUpload";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const ListingModal = () => {
  const { isOpen, onClose } = useListModal();
  const categories = getCategoryData();
  const [step, setStep] = useState(1);
  const router = useRouter()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [price, setPrice] = useState("0");
  const [placeType, setPlaceType] = useState("");
  const [guests, setGuests] = useState('1')
  const [amenities, setAmenities] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const options = categories.map((category) => ({
    value: category.title,
    label: category.title,
  }));

  const placeTypeOptins = [
    {
      value: "single room",
    },
    {
      value: "double room",
    },
    {
      value: "villa",
    },
    {
      value: "boat",
    },
    {
      value: "cabbins",
    },
    {
      value: "islands",
    },
  ];

  function handleOptions(options: any) {
    setAmenities(options.map((item: any) => item.value));
  }

  function handleNext() {
    setStep((step) => step + 1);
  }

  function handlePrev() {
    setStep((step) => step - 1);
  }

  function handleUploadComplete(res: string) {
    setImageUrl(res);
  }

  const handleSubmit = async() => {
    try {
      const res = await axios.post('/api/listing', {name,description,placeType,price,address,amenities,imageUrl,guests,latitude,longitude})
      if(res.status === 200){
        onClose()
        router.push('/')
        router.refresh()
        setAddress('')
        setName('')
        setDescription('')
        setImageUrl('')
        setPrice('')
        setStep(1)

      }
    } catch (error) {
      console.log(error)
    }

  };

  if (isOpen) {
    switch (step) {
      case 1:
        return (
          <div className="fixed inset-0 h-full w-full flex items-center justify-center z-50  bg-white/50">
            <div className=" md:w-2/4 h-auto bg-white shadow-lg rounded-xl m-2 overflow-scroll p-3 sm:p-8">
              <div className="flex items-center justify-between  py-4">
                <p className="text-xl font-medium capitalize">Give us Some Information about your place</p>
                <div onClick={onClose}>
                  <RxCross1 className="hover:opacity-40" />
                </div>
              </div>

              <div className="flex flex-col  gap-2 items-start mt-2">
                <label className="text-xs font-medium" htmlFor="name">
                  Give your Place&apos;s Name :
                </label>
                <input
                  className="p-2 w-full rounded-md border-2 outline-none"
                  placeholder="Place Name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col  gap-2 items-start mt-4">
                <label className="text-xs font-medium" htmlFor="name">
                  Give your Place&apos;s Description :
                </label>
                <input
                  className="p-2 w-full rounded-md border-2 outline-none"
                  placeholder="Place Description"
                  id="name"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              
              <div className="flex flex-col  gap-2 items-start mt-4">
                <label className="text-xs font-medium" htmlFor="name">
                  Number Of Guests Capacity :
                </label>
                <input
                  className="p-2 w-full rounded-md border-2 outline-none"
                  placeholder="Place Description"
                  id="name"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col  gap-2 items-start mt-4">
                <label className="text-xs font-medium" htmlFor="options">
                  What Your Place Offers Select Multiple
                </label>
                <Select
                  className="w-full"
                  options={options}
                  onChange={handleOptions}
                  isMulti={true}
                />
              </div>

              <div className="flex flex-col  gap-2 items-start mt-4">
                <label className="text-xs font-medium" htmlFor="name">
                  What Type Of Place :
                </label>
                <select
                  className="p-2 w-full rounded-md border-2 text-black outline-none"
                  id="name"
                  value={placeType}
                  onChange={(e) => setPlaceType(e.target.value)}
                  required
                >
                  {placeTypeOptins.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="text-black"
                    >
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end p-2">
                <button
                  onClick={handleNext}
                  className="bg-rose-500 py-2 px-6 rounded-md text-white text-right hover:opacity-50 disabled:opacity-40"
                  disabled={!name || !description || !placeType}
                >
                  next
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="fixed inset-0 h-full w-full flex items-center justify-center z-50  bg-white/50">
            <div className="w-full md:w-2/4 h-auto bg-white shadow-lg rounded-xl m-2 overflow-scroll p-3 sm:p-8">
              <div className="flex items-center justify-between  py-4">
                <p className="text-2xl text-rose-500 font-medium capitalize"></p>
                <div onClick={onClose}>
                  <RxCross1 className="hover:opacity-40" />
                </div>
              </div>

              <div className="flex flex-col  gap-2 items-start mt-2">
                <label className="text-xs font-medium" htmlFor="name">
                  Your Place&apos;s Address :
                </label>
                <input
                  className="p-2 w-full rounded-md border-2 outline-none"
                  placeholder="e.g gazipur, dhaka, bangladesh"
                  id="name"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col  gap-2 items-start mt-4">
                <label className="text-xs font-medium" htmlFor="name">
                  Your Place&apos;s Latitude :
                </label>
                <input
                  className="p-2 w-full rounded-md border-2 outline-none"
                  placeholder="-3232.2323"
                  id="name"
                  type="number"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col  gap-2 items-start mt-4">
                <label className="text-xs font-medium" htmlFor="name">
                  Your Place&apos;s Longitude :
                </label>
                <input
                  className="p-2 w-full rounded-md border-2 outline-none"
                  placeholder="11232.2323"
                  id="name"
                  type="number"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col  gap-2 items-start mt-4">
                <label className="text-xs font-medium" htmlFor="name">
                  Specify a Price for one Night :
                </label>
                <input
                  className="p-2 w-full rounded-md border-2 outline-none"
                  placeholder="$343"
                  min={10}
                  id="name"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-between items-center  p-2">
                <button
                  onClick={handlePrev}
                  className="bg-rose-500 py-2 px-6 rounded-md text-white text-right hover:opacity-50"
                >
                  previous
                </button>
                <button
                  onClick={handleNext}
                  className="bg-rose-500 py-2 px-6 rounded-md text-white text-right hover:opacity-50 disabled:opacity-45"
                  disabled={!latitude || !longitude || !price || !address}
                >
                  next
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="fixed inset-0 h-full w-full flex items-center justify-center z-50  bg-white/50">
            <div className="w-full md:w-2/4 md:h-auto bg-white shadow-lg rounded-xl m-2 overflow-scroll p-2 sm:p-8">
              <div className="flex items-center justify-between  py-4">
                <p className="text-2xl text-rose-500 font-medium capitalize"></p>
                <div onClick={onClose}>
                  <RxCross1 className="hover:opacity-40" />
                </div>
              </div>

              <h2 className="text-xl font-medium text-center">
                Upload An Image Of Your Place
              </h2>
              <div className="h-fit flex items-center justify-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="uploaded image"
                    width={200}
                    height={200}
                  />
                ) : (
                  <ImageUpload onComlete={handleUploadComplete} />
                )}
              </div>

              <div className="flex justify-between items-center mt-auto  p-2">
                <button
                  onClick={handlePrev}
                  className="bg-rose-500 py-2 px-6 rounded-md text-white text-right hover:opacity-50"
                >
                  previous
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-rose-500 py-2 px-6 rounded-md text-white text-right hover:opacity-50 disabled:opacity-45"
                  disabled={!imageUrl}
                >
                  complete
                </button>
              </div>
            </div>
          </div>
        );
    }
  }
};

export default ListingModal;
