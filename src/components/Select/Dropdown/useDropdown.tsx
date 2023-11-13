

import React from 'react';
import { ActionMeta, OptionsOrGroups, GroupBase } from 'react-select';
import { ReactSelectOptProps } from './Dropdown.d';

const createCheckedList = (options: readonly ReactSelectOptProps[], defaultValue?: ReactSelectOptProps) => {
  return options.map((opt) => opt.value === defaultValue?.value ? true : false)
}
const createOptionsValue = (options: ReactSelectOptProps[]) => {
  return options.map((v) => v.value)
}

const useSelect = (options: OptionsOrGroups<any, GroupBase<ReactSelectOptProps>>, defaultValue?: ReactSelectOptProps) => {
  const [checkedList, setCheckedList] = React.useState<boolean[]>(createCheckedList(options, defaultValue));
  const [optionsValue, setOptionsValue] = React.useState<OptionsOrGroups<any, GroupBase<ReactSelectOptProps>>>(options);

  const handleChange = React.useCallback((
    newValue: ReactSelectOptProps | readonly ReactSelectOptProps[],
    actionMeta: ActionMeta<ReactSelectOptProps>
  ) => {
    //console.log('newValue', newValue)

    if (Array.isArray(newValue)) {
      // ---- MultiSelect ----
      // Handle array type
      const { option, removedValue } = actionMeta;
      // ---- Process each item in the array ----
      // 
      if (actionMeta.action === 'remove-value') {
        const removeIndex = options.findIndex((opt: ReactSelectOptProps) => opt.value === removedValue?.value)
        checkedList.splice(removeIndex, 1, !checkedList[removeIndex])
        setCheckedList([...checkedList])
        return;
      }
      // get selected option.
      const changeIndex = options.findIndex((opt: ReactSelectOptProps) => opt.value === option?.value)
      // replace checkedList value with the selected option.
      //console.log(changeIndex)
      checkedList.splice(changeIndex, 1, !checkedList[changeIndex])

      // ---- onClick OptGroup ----
      if (option?.value.includes('_SELECT_ALL')) {

      }
      // ---- onClick OptChild ----
      if (!option?.value.includes('_SELECT_ALL')) {

      }

      // update. 
      setCheckedList([...checkedList])

    } else {
      // ---- SingleSelect ----
      // Handle single object type.
      const { value, label } = newValue as { value: string; label: string } || {}
      // ---- Process the single object ----
      // initialize checkedList as all false.
      const intialCheckedList = checkedList.map(() => false);
      // 
      if (actionMeta.action === 'clear') {
        setCheckedList([...intialCheckedList])
        return;
      }
      // get selected option.
      const changeIndex = options.findIndex((opt: ReactSelectOptProps) => opt.value === value)
      //console.log(changeIndex)
      // replace checkedList value with the selected option.
      intialCheckedList.splice(changeIndex, 1, !checkedList[changeIndex])
      // update. 
      setCheckedList([...intialCheckedList])
    }

    // const { action, option, removedValue } = actionMeta;
    // const { UserInput } = genUserInputProps(newValue, actionMeta, props)

    // const updateGroupOptChecked = (selected: any, option: ReactSelectOptProps) => {
    //   if (!checkedList) {
    //     return null;
    //   }
    //   const { indexes, groupSelectAll, updateItems } = groupSelectOptions(selected, option, props.options)
    //   updateItems.map((x: any) => {
    //     checkedList.splice(x, 1, !checkedList[x]);
    //     return null;
    //   })

    //   indexes
    //     .map((x: any, i) => {
    //       if (checkedList[x] || groupSelectAll[i]) {
    //         checkedList[x] = groupSelectAll[i];
    //         return null;
    //       }
    //     });

    //   console.log(checkedList)
    //   setCheckedList(() => checkedList)

    // };

    // const updateChildOptChecked = (selected: ReactSelectOptProps[], option: ReactSelectOptProps) => {
    //   if (!checkedList) {
    //     return;
    //   }
    //   const { indexes, groupSelectAll, updateItems }
    //     = groupSelectOptions(selected, option, props.options)

    //   let idd: number = indexes
    //     .findIndex((x: (number | undefined)) => x === UserInput.startIndex)

    //   const child:ReactSelectOptProps[] = props.options
    //     .slice(UserInput.startIndex, indexes[idd + 1])

    //   const updateId = props.options
    //     .map((opt:ReactSelectOptProps, i: number) => child.filter((x) => x.value === opt.value).length && i)
    //     .filter((x: number) => x > -1)

    //   if (!child.length) {
    //     //console.log('updateItem', updateItem)
    //     updateItems.map((x: any, i: number) => {
    //       checkedList.splice(x, 1, !checkedList[x]);
    //       return null;
    //     })
    //   } else {
    //     // console.log('updateId', updateId)
    //     updateId.map((v: any) => {
    //       v > -1 && checkedList.splice(v, 1, groupSelectAll[idd]);
    //       return null;
    //     })
    //   }


    //   indexes
    //     .map((x: any, i: number) => {
    //       if (checkedList[x] || groupSelectAll[i]) {
    //         checkedList[x] = groupSelectAll[i]
    //         return null;
    //       }
    //     });

    //   setCheckedList(() => checkedList);

    //   // console.log('child', child)
    //   // console.log('updateId', updateId)
    //   // console.log('UserInput.update', UserInput.update)
    //   // console.log('indexes', indexes)
    //   // console.log('checked', checked)
    //   // console.log('groupSelectAll', groupSelectAll);
    //   //updateGroupOptChecked(selected)
    // };



    // /**
    // * select(remove) by child
    // */
    // if ((action === "deselect-option")
    //   && !option?.value.includes('_SELECT_ALL')
    //   && option?.value !== selectAllAdmin.value
    // ) {
    //   // console.log('select(remove) by child')

    //   props.onChange(newValue || [], { ...actionMeta });
    //   option && updateGroupOptChecked(newValue, option);
    // }

    // /**
    //  * select(add and remove) by groupname
    //  */
    // if ((action === "select-option" || action === "deselect-option")
    //   && option?.value.includes('_SELECT_ALL')
    //   && option?.value !== selectAllAdmin.value
    // ) {
    //   UserInput.new()
    //     .map((x: ReactSelectOptProps) => isSelectedAlready(UserInput.last, x)
    //       ? null
    //       : UserInput.update.push(x));
    //   props.onChange(UserInput.merge(), { ...actionMeta, action: action });
    //   updateChildOptChecked(UserInput.merge(), option);

    //   // console.log('select(add and remove) by groupname', UserInput.merge())
    // }
    // /**
    //  * remove-value
    //  */
    // if (action === 'remove-value') {
    //   props.onChange(newValue || [], { ...actionMeta });
    //   updateChildOptChecked(UserInput.merge(), removedValue)

    //   //console.log('remove-value')
    // }

  }, []);

  return {
    handleChange,
    checkedList,
    setCheckedList,
    optionsValue
  }
}

export default useSelect