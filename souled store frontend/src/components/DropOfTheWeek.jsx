import React from 'react';
import Item1Image from '../images/drop of the week 1.webp';
import Item2Image from '../images/drop of the week2.webp';
import Item3Image from '../images/drop of the week2.webp';
import { Link } from 'react-router-dom';

const DropOfTheWeek = () => {
  return (
    <div className="flex justify-center items-center mt-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* Box 1 */}
        <div className="bg-white border rounded shadow-lg p-4">
          <Link to="/Drop">
            <img src={Item1Image} alt="Item 1" className="mb-2 w-full h-40 sm:h-52 md:h-60 lg:h-80 object-cover rounded" />
          </Link>
        </div>

        {/* Box 2 */}
        <div className="bg-white border rounded shadow-lg p-4">
          <img src={Item2Image} alt="Item 2" className="mb-2 w-full h-40 sm:h-52 md:h-60 lg:h-80 object-cover rounded" />
        </div>

        {/* Box 3 */}
        <div className="bg-white border rounded shadow-lg p-4">
          <img src={Item3Image} alt="Item 3" className="mb-2 w-full h-40 sm:h-52 md:h-60 lg:h-80 object-cover rounded" />
        </div>
      </div>
    </div>
  );
};

export default DropOfTheWeek;
