import { filtering } from './filtering';

export function checkVaildQueryField(
  rows: any[],
  headCells: any[],
  queryString: string
): any[] {
  return headCells
    .map((headCell: { id: string; }) => rows.some((row: Element) => row[headCell.id as keyof typeof row])
      ? filtering({ rows, headCellId: headCell.id, queryString })
      : undefined)
    .filter((y: undefined | any[]) => y?.length);
}
