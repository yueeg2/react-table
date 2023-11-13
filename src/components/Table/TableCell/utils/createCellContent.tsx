import { strDataParser, arrDataParser } from "./dataParser";


export function createCellContent(rowCellData: any) {
  console.log('createCellacontent FUnction rowCellData',rowCellData)
  if (!rowCellData) {
    return <span>N/A</span>;
  }
  // add button components here if rowCellData is button string 
  if(rowCellData==="button"){
    return <></>
  }
  if (typeof rowCellData === 'string') {
    return strDataParser(rowCellData);
  }
  if (typeof rowCellData === 'boolean') {
    return rowCellData;
  }
  if (typeof rowCellData === 'object' && rowCellData?.status) {
    return <span style={{ color: `var(--${rowCellData?.status})` }}>{rowCellData?.description}</span>;
  }
  if (typeof rowCellData === 'object' && rowCellData?.Mail !== undefined) {

    return arrDataParser(Object.entries(rowCellData).filter(x => x[1]).map(y => y[0]));
  }
}
