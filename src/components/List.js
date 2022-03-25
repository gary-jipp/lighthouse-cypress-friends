import React from 'react';

function List(props) {
  const items = props.items || [];

  const list = items.map((item) => {
    return <li key={item.uid} onClick={() => props.deleteItem(item.uid)} >{item.name}</li>;
  });

  return (
    <ul>{list}</ul>
  );
}

export default List;