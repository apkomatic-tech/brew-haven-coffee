import React from 'react';

type ContainerProps = {
  children: any;
};

function Container({ children }: ContainerProps) {
  return <div className='mt-24 mb-16 container px-4 mx-auto max-w-full lg:max-w-7xl'>{children}</div>;
}

export default Container;
