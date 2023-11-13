import { TRProps } from "@/components/Table/table.d";

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

export const disabledRow = (resData: TRProps[], curSelected: readonly string[], disableStatus:string): TRProps[] => {
    //console.log(curSelected)
    const replacedResData: TRProps[] = Object.values(resData).map((TR: TRProps, i) => {
        const key = Object.keys(TR)[0];
        const rowId = Object.values(TR)[0][0].rowID;
        const status = Object.values(TR)[0][0].label.props.status;
        const Index = curSelected.find(v => v === rowId.toString() && disableStatus === status )
        //console.log(status, rowId, Index)
        const newKey = Index ? 'disabled' : key
        return { [newKey]: resData[i][key] };
    });
    return replacedResData
}