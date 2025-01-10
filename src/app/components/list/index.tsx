import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const listItems: string[] = [
  "Reach Million of Shoppers",
  "Easy Product Listing",
  "Secure and Fasting Payments",
  "Boost Your Visibility",
];

const List: React.FC = () => {
  return (
    <div className="p-4 bg-light-primary border-[0.5px] border-primary rounded-2xl">
      <ul className="flex flex-col gap-2">
        {listItems.map((listItem, index) => (
          <li key={index} className = "flex justify-start items-center gap-2">
            <IoCheckmarkCircleOutline size={20} color="#8A226F" />
            <p className="font-medium text-sm">{listItem}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { List };
