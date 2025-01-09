import React from 'react';
import Item1Image from '../images/CATEGORIES1.webp';
import Item2Image from '../images/CATEGORIES2.webp';
import Item3Image from '../images/CATEGORIES3.webp';
import Item4Image from '../images/CATEGORIES4.webp';
import Item5Image from '../images/CATEGORIES5.webp';
import Item6Image from '../images/CATEGORIES6.webp';
import Item7Image from '../images/CATEGORIES7.webp';
import Item8Image from '../images/CATEGORIES8.webp';
import Item9Image from '../images/CATEGORIES9.webp';
import Item10Image from '../images/CATEGORIES10.webp';
import Item11Image from '../images/CATEGORIES11.webp';

const Categories = () => {
  const items = [
    { src: Item1Image, alt: 'Item 1' },
    { src: Item2Image, alt: 'Item 2' },
    { src: Item3Image, alt: 'Item 3' },
    { src: Item4Image, alt: 'Item 4' },
    { src: Item5Image, alt: 'Item 5' },
    { src: Item6Image, alt: 'Item 6' },
    { src: Item7Image, alt: 'Item 7' },
    { src: Item8Image, alt: 'Item 8' },
    { src: Item9Image, alt: 'Item 9' },
    { src: Item10Image, alt: 'Item 10' },
    { src: Item11Image, alt: 'Item 11' },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {items.map((item, index) => (
          <div key={index} className="bg-white border rounded shadow-lg p-4">
            <img src={item.src} alt={item.alt} className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
