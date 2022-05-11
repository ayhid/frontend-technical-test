import React from 'react';

const Loader: React.FunctionComponent = () => {
  return (
    <div className="flex justify-center items-center pt-4 ">
      <div
        style={{ borderTopColor: 'transparent' }}
        className="animate-spin  w-8 h-8  border-4  border-orange-500 rounded-full"
      ></div>
    </div>
  );
};

export default Loader;
