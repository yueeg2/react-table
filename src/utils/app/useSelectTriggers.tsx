import React, { Dispatch, SetStateAction } from 'react';
import Button from '../../components/Button';
import { SelectedProps } from '../../components/Select/Dropdown/Dropdown.d';
import { disabledRow, getIds } from '../../components/Select/Dropdown/getIds';
import { TRProps } from '@/components/Table/table';

export const useSelectTriggers = ([TRs, setTbody, disabledTB, setDisabledTB]: [
  TRs: TRProps[], setTbody: Dispatch<SetStateAction<TRProps[]>>,
  disabledTB: TRProps[], setDisabledTB: Dispatch<SetStateAction<TRProps[]>>,

]) => {

  const onAction = React.useCallback((
    Set: any,
    [selected, setSelected]: SelectedProps,
    status: 'warning' | 'critical') => (e: React.MouseEvent<HTMLButtonElement>) => {

      const readyIDs = getIds(Set, selected).filter((v: string) => v !== 'disabled');
      //alert(`ready to action(rowID): ${readyIDs}`);

      setSelected(() => readyIDs)
      setTbody(() => disabledRow(TRs, selected, status));
      setDisabledTB(disabledRow(disabledTB, selected, status));

      setSelected([]);

    }, [TRs]);

  return [
    {
      status: "warning",
      statusIndex: 1,
      action: onAction,
      ActionElement: ({ onClick }: any) => <Button
        text="Disable Warning" buttonColor="rgb(255, 173, 0)"
        onClick={onClick} icon="Disable_white" />
    },
    {
      status: "critical",
      statusIndex: 1,
      action: onAction,
      ActionElement: ({ onClick }: any) => <Button
        text="Disable Critical" buttonColor="var(--engineRed)"
        onClick={onClick} icon="Disable_white" />
    },
  ];
}

