import React from 'react';
import Button from '../../components/Button';
import { SelectedProps } from '../../components/Select/Dropdown/Dropdown.d';
import { getIds } from '../../components/Select/Dropdown/getIds';

export const useSelectTriggers = () => {
  const onAction = React.useCallback((Set: any, [selected, setSelected]: SelectedProps,) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const readyDeleteIDs = getIds(Set, selected).filter((v: string) => v !== 'disabled');
    alert(`ready to delete(rowID): ${readyDeleteIDs}`)
  }, [])
  
  return [
  {
    status: "warning",
    statusIndex: 1,
    action: onAction,
    ActionElement: ({ onClick }: any) => <Button
      text="Delete Warning" buttonColor="rgb(255, 173, 0)"
      onClick={onClick} icon="Trashcan_white" />
  },
  {
    status: "critical",
    statusIndex: 1,
    action: onAction,
    ActionElement: ({ onClick }: any) => <Button
      text="Delete Critical" buttonColor="var(--engineRed)"
      onClick={onClick} icon="Trashcan_white" />
  },
];
}