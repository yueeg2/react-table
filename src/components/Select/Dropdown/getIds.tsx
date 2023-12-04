import { TRProps } from "src/utils/table.d";

export function getIds(Set: any, selected: any) {
    let selectedRowIDs: string[] = [];
    //console.log(Set, selected)
    Set.forEach((value: any) => {
        //console.log(value)
        selectedRowIDs.push(!value ? value : value[0].rowID.toString());
    });
    //console.log(selectedRowIDs)
    const res = selected.map((ID: string) => selectedRowIDs.includes(ID) ? ID : 'disabled');
    return res;
}

export const disabledRow = (resData: TRProps[], curSelected: readonly string[], disableStr: string): TRProps[] => {
    const replacedResData: TRProps[] = Object.values(resData).map((TR: TRProps, i) => {
        const key = Object.keys(TR)[0];
        const TRProp: TRProps = Object.values(TR)[0];
        const { rowID, label } = TRProp[1]
        const searchStr = label.props?.status || label;
        const Index = curSelected.find(v => v === rowID.toString() && (disableStr === searchStr))
        //console.log(disableStr, label, rowID, Index)
        const newKey = Index ? 'disabled' : key
        return { [newKey]: resData[i][key] };
    });
    return replacedResData
}