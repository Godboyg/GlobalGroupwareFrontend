import React, { useState } from "react";
import "../App.css"
import axios from "axios";

function UserCard({ firstName, lastName, avatar , id , onDelete , SetTrue}) {

  return (
    <>
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between border border-gray-200">
      <div className="flex items-center gap-4 ">
      <img
        src={avatar}
        alt={`${firstName} ${lastName}`}
        className="w-16 h-16 rounded-full border border-gray-300"
      />
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-gray-500">User Profile</p>
      </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="hover:cursor-pointer" onClick={SetTrue}>✏️</p>
        <p className="hover:cursor-pointer" onClick={onDelete}>🗑</p>
      </div>
    </div>
    </>
  );
}

export default UserCard;
