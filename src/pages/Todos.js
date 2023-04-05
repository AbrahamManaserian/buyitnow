import { memo } from 'react';

const Todos = ({ todos, addTodo }) => {
  console.log('child render');
  return <>Abraham</>;
};

export default memo(Todos);
