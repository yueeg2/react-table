import { Key, useState } from 'react';

export function useSelects(rows: Array<any>) {
  const [rowCollapse, setRowCollapse] = useState<boolean>(false);

  const [selectedForRemove, setSelectedForRemove] = useState<readonly string[]>([]);

  const handleSelectRowClick = (id: string | number) => (event: any) => {

    //console.log(id.toString())
    if (event.target.localName === 'input') {
      const selectedIndex = selectedForRemove.indexOf(id.toString());
      let newSelected: readonly string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedForRemove, id.toString());
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedForRemove.slice(1));
      } else if (selectedIndex === selectedForRemove.length - 1) {
        newSelected = newSelected.concat(selectedForRemove.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedForRemove.slice(0, selectedIndex),
          selectedForRemove.slice(selectedIndex + 1),
        );
      };
      setSelectedForRemove(() => newSelected);
      return;
    }

    if (event.target.localName === 'th' || event.target.localName === 'td') {
      setRowCollapse(!rowCollapse)
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelecteds = rows.length < 1
      ? ['null']
      : rows.map((row: { [key:string]: object }) => {
        return row?.cells ? `${Object.values(row?.cells)[0].rowID}` : 'disabled'
      })


    if (newSelecteds.length > rows.length) {
      //console.log('newSelecteds', newSelecteds)
      throw new Error('newSelecteds.length > rows.length')
    }
    if (event.target.checked) {
      setSelectedForRemove(() => newSelecteds);
    } else {
      setSelectedForRemove(() => []);
    }
  };

  const selectedRowsId = (name: string) => {
    return selectedForRemove.indexOf(name.toString()) !== -1;
  }


  return {
    selectedForRemove,
    setSelectedForRemove,
    handleSelectAllClick,
    handleSelectRowClick,
    selectedRowsId
  };
}

