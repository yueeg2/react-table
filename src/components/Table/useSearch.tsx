'use client';
import React from "react";
import { type TRProps } from "src/utils/table.d";


export function useSearch () {

  const [filterFn, setFilterFn] = React.useState<{ fn: (rows: TRProps[]) => any }>({ fn: (rows: TRProps[]) => rows });
  const handleSearch = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setFilterFn({
      fn: onSearch(evt.target.value.toLowerCase())
    });
  }, []);
  
  return { filterFn, setFilterFn, handleSearch}
}
/**
 * 
 * @param queryString 
 * @returns 
 */
export function onSearch(queryString: string) {
  let searchLabel: string = '';

  return (rows: TRProps[]) => {

    //TODO optimize (bigO)
    const FilteredRows: (TRProps | undefined)[] = rows.map((TR: TRProps) => {

      for (let Cell of Object.values(TR.cells || TR.disabled)) {

        if (queryString === '') {

          return TR;

        };

        if (typeof Cell.label === 'string') {

          searchLabel = Cell.label;

        };
        if (typeof Cell.label === 'number') {

          searchLabel = Cell.label.toString();

        };
        if (typeof Cell.label === 'object') {

          //if the target string in wrapped in button, Link or a
          const { status, last_updated, node_ip, node_type, children, label } = Cell.label.props;

          //console.log("CELL", Cell.label.props);
          if (typeof children === 'string') {
            searchLabel = children;
          } else if (children && children[0] && children[1] && children[1].props.label) {
            searchLabel = children[1].props.label;
          } else if (children && children[0] && children[1]) {
            searchLabel = children[0].props.children.props.children;
          } else if (children && children[0]) {
            const text = children[0].props;
            searchLabel = text.children;
          } else if (children?.props) {
            const { label } = children.props;
            if (label) {
              searchLabel = label;
            }
          } else if (status || last_updated || node_ip || node_type || label?.toString() || Cell.label.props['aria-label']) {
            searchLabel = (status + last_updated + node_ip + node_type + (label?.toString() || "") + (Cell.label.props['aria-label'] || "")).replace(/undefined/ig, '');
          }

          if (!searchLabel) {
            searchLabel = children ? children.toString() : '';
            console.log('searchLabel', searchLabel);
          }

        };

        if (!searchLabel) {

          console.error('searchLabel is', searchLabel);
          break;

        };

        if (queryString !== '' &&

          !searchLabel.toString().toLowerCase().includes(queryString)) {
          continue;

        } else {

          return TR;

        };
      };
    });

    return FilteredRows.filter(v => v);
  };
}
