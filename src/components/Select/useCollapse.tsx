import React from 'react';
import { ReactSelectProps } from './Dropdown/Dropdown.d';




export const useCollapse = (options: any[]) => {
  const status
    = (option: ReactSelectProps[]): boolean[] => option.map(() => false);
  const [collapse, setCollapse]
    = React.useState<boolean[]>(status(options));
  const onCollapse
    = (option: any) => (e: React.SyntheticEvent) => {
      let target = e.target as HTMLInputElement;
      if (target.id.includes('checkbox')) {
        return false;
      }
      let index: number = parseInt(target.id.slice(-1));
      let legnth: number = parseInt(option.label.slice(-2, -1));
      Array.apply(null, new Array(legnth + 1)).map((e, i) => collapse.splice(index + i, 1, !collapse[index + i]));
      !target.id.includes('checkbox') && setCollapse(collapse)
      e.stopPropagation();
    }

  return { onCollapse, collapse, setCollapse }
}