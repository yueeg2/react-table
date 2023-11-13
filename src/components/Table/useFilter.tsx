import { useState } from "react";
import { getComparator, stableSort } from "./Table.utils";



export function useFilter({rows}: any): Array<any> {
  const [filterFn, setFilterFn] = useState({ fn: (items: any) => { return items; } });

  const handleSearch = (e: any) => {
    let target = e.target;
    setFilterFn({
      fn: items => {
        if (target.value == "")
          return items;
        else
          return items
            .filter((x: any) => x.fullName.toLowerCase().includes(target.value))
      }
    })
  }

  return [
    filterFn, setFilterFn ,handleSearch
  ];
}