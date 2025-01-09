import React, { useState } from 'react';
import Sidebar from '../admin/AdminNav';

const MainLayout = () => {
  const [activePage, setActivePage] = useState('Product Listing'); // Default page
  const [pageContent, setPageContent] = useState(<div>Product Listing Page</div>);

  const handlePageChange = (pageName, content) => {
    setActivePage(pageName);
    setPageContent(content);
  };

  return (
    <div className="flex h-screen">
      <Sidebar handlePageChange={handlePageChange} />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">{activePage}</h1>
        <div className="content-area bg-white p-4 shadow rounded-lg">
          {pageContent}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
