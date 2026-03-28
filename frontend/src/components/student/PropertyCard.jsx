import { useState } from "react";

const PropertyCard = ({ property, onClick }) => {
  return (
    <div 
      className="bg-white rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#E5E7EB] overflow-hidden flex flex-col h-full hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer" 
      onClick={() => onClick(property.id)}
    >
      <div className="relative h-[200px] w-full">
        <img 
          src={property.images ? property.images[0] : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"} 
          alt={property.title} 
          className="w-full h-full object-cover" 
        />
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${property.available ? "bg-[#D3F5E1] text-[#1E7B44]" : "bg-[#FFE6D5] text-[#C45E1A]"}`}>          
          {property.available ? "Available" : "Booked"}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-gray-800 shadow-sm">
          ${property.rent}/mo
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-[#1A1A1A] font-bold text-[16px] mb-1.5 leading-tight">{property.title || "Modern Studio near Campus"}</h3>
        <p className="text-[#6B7280] text-[13px] mb-4">{property.location || "123 University Ave, Cityville"}</p>
        
        <div className="flex items-center justify-between text-[13px] text-[#4B5563] font-medium mb-5">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg> 
            {property.rooms || 1} Bed
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> 
            {property.bathrooms || 1} Bath
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg> 
            {property.area || "450"} sq ft
          </div>
        </div>
        
        <button className="w-full py-2.5 bg-[#4B4282] hover:bg-[#3C327B] text-white text-[14px] font-medium rounded-lg transition-colors mt-auto">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
