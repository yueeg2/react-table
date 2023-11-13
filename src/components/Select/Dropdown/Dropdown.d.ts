import * as ReactSelect from 'react-select';

export interface CategorySelectProps {
  label: string;
  options: ReactSelectOptProps[];
}

export interface ReactSelectOptProps {
  value: string;
  label: string;
}

export interface ReactSelectProps extends ReactSelect.Props<any> {
  options: OptionsOrGroups<FieldValues, GroupBase<ReactSelectOptProps>>,
  isVisible: boolean
  checkedList: boolean[],
  style?: any
  minWidth?: number,
};

export type SelectedProps = [selected: readonly string[], setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>];