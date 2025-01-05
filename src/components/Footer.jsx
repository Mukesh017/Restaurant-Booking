import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-center text-white p-4 mt-8">
      &copy; {new Date().getFullYear()} The Food Station. All Rights Reserved.
    </footer>
  );
};

export default Footer;