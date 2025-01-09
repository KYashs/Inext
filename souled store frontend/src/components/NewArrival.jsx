import React from 'react';
import Item1Image from '../images/new arrival1.webp';
import Item2Image from '../images/new arrival2.webp';
import Item3Image from '../images/new arrival3.webp';
import Item4Image from '../images/new arrival4.webp';

const NewArrival = () => {
  return (
    <div className="mt-10 px-4">
      <div className="flex flex-wrap justify-center gap-2">
        {/* Box 1 */}
        <div className="w-full sm:w-1/2 md:w-1/5 p-4">
          <div className="bg-white border rounded shadow-lg p-4">
            <img src={Item1Image} alt="Item 1" className="mb-2 w-full h-62 object-cover rounded" />
            <div className="font-semibold text-xs">Colour Block Cable Knit Pullover: Superman logo</div>
            <hr className="my-2" />
            <div className="text-sm">Young Boys T-Shirt</div>
            <div className="font-bold text-lg mt-1">₹{499}</div>
          </div>
        </div>

        {/* Box 2 */}
        <div className="w-full sm:w-1/2 md:w-1/5 p-4">
          <div className="bg-white border rounded shadow-lg p-4">
            <img src={Item2Image} alt="Item 2" className="mb-2 w-full h-62 object-cover rounded" />
            <div className="font-semibold text-xs">Colour Block Cable Knit Pullover: Superman logo</div>
            <hr className="my-2" />
            <div className="text-sm">Young Boys T-Shirt</div>
            <div className="font-bold text-lg mt-1">₹{499}</div>
          </div>
        </div>

        {/* Box 3 */}
        <div className="w-full sm:w-1/2 md:w-1/5 p-4">
          <div className="bg-white border rounded shadow-lg p-4">
            <img src={Item3Image} alt="Item 3" className="mb-2 w-full h-62 object-cover rounded" />
            <div className="font-semibold text-xs">Colour Block Cable Knit Pullover: Superman logo</div>
            <hr className="my-2" />
            <div className="text-sm">Young Boys T-Shirt</div>
            <div className="font-bold text-lg mt-1">₹{499}</div>
          </div>
        </div>

        {/* Box 4 */}
        <div className="w-full sm:w-1/2 md:w-1/5 p-4">
          <div className="bg-white border rounded shadow-lg p-4">
            <img src={Item4Image} alt="Item 4" className="mb-2 w-full h-62 object-cover rounded" />
            <div className="font-semibold text-xs">Colour Block Cable Knit Pullover: Superman logo</div>
            <hr className="my-2" />
            <div className="text-sm">Young Boys T-Shirt</div>
            <div className="font-bold text-lg mt-1">₹{499}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArrival;
