import React from "react";

function CardDataStat({ icon: Icon, title, data }) {
  return (
    <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
      <Icon className="text-indigo-500 w-12 h-12 mb-3 inline-block" />
      <h2 className="title-font font-medium text-3xl text-gray-900">{data}</h2>
      <p className="leading-relaxed">{title}</p>
    </div>
  );
}

export default CardDataStat;
