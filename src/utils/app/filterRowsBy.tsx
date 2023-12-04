import { ReactSelectProps } from '../../components/Select/Dropdown/Dropdown.d';
import { TRProps } from '../table.d';


export function filterRowsBy(
  select: ReactSelectProps,
  CellIndex: number,
  resData: TRProps[]) {


  return select?.value !== 'all'
    ? resData.filter((data: TRProps) => {
      const Label = Object.values(data.cells || data.disabled)[CellIndex];
      return Label.label.props?.status === select?.value
        || Label.label === select?.value;
    })
    : resData;
};


export function disabledRowsBy(
  select: ReactSelectProps,
  CellIndex: number,
  resData: TRProps[]) {


  return resData
};