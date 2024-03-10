import React from 'react';
import ListItem from './ListItem';

export default function ProductsList({ productsOnPage, offset }) {
  return (
    <>
      <ListItem isHeader={true} />
      {productsOnPage?.map((product, i) => (
        <ListItem product={product} index={i + 1 + offset} key={product?.id} />
      ))}
    </>
  );
}
