"use client";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSignInModal from "@/hooks/useSignInModal";

interface ReservationProps {
  user: User;
  session: any;
  list: Listing & {
    owner: User;
  } & {
    reservations: Reservation[];
  };
}

const ReservationPage = ({ user, list, session }: ReservationProps) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const { onOpen } = useSignInModal();
  const router = useRouter();

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    setStartDate(ranges.selection.startDate!);
    setEndDate(ranges.selection.endDate!);
    console.log(ranges);
  };

  const handleReservation = async () => {
    if (!session) {
      onOpen();
      return;
    }
    try {
      setIsProcessing(true);
      const res = await axios.post(`/api/reservation`, {
        startDate,
        endDate,
        guests,
        listId: list.id,
      });
      if (res.status === 200) {
        router.push("/trips");
        router.refresh();
        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //button disabling logic
  const currentdate = {
    date: startDate.getDate(),
    month: startDate.getMonth(),
    year: startDate.getFullYear(),
  };
  const disablesDates = list.reservations.map(
    (reservation) => reservation.startDate || reservation.endDate
  );
  const disableButton = disablesDates.map((date) => {
    return {
      date: date.getDay(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  });

  return (
    <div>
      <div className="overflow-scroll m-2">
        <DateRangePicker
          className="w-full text-center text-xs"
          ranges={[selectionRange]}
          disabledDates={disablesDates}
          minDate={new Date()}
          onChange={handleSelect}
        />
      </div>
      <div className="p-4 flex items-center justify-between">
        <label htmlFor="guests">Number Of Guests</label>
        <input
          className="bg-gray-300 p-2 rounded-md outline-none"
          type="number"
          min={1}
          id="guests"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
        />
      </div>
      <button
        onClick={handleReservation}
        disabled={
          disableButton.some(
            (date) =>
              date.date === currentdate.date &&
              date.month === currentdate.month &&
              date.year === currentdate.year
          ) || isProcessing
        }
        className="px-4 py-2 mx-4 rounded-md text-lg font-medium bg-rose-500 text-white w-[90%] md:w-full hover:opacity-40 transition-all disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Reserve"}
      </button>
    </div>
  );
};

export default ReservationPage;
