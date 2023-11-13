import React from "react";
import { useForm } from "react-hook-form";

export function useSelectFilter(resData: any, cb?: () => Promise<any>) {
  const methods = useForm<any>({});

  const {
    watch,
  } = methods;

  const WithSelectFilter = React.useCallback(async () => {
    const { queryTime, rollStatus } = watch();
    //console.log(rollStatus, resData, queryTime?.value )
    if (rollStatus?.value && queryTime?.value && cb) {
      /** requesting api  */
      return await cb()

      // return await fetch(`/dev/api/record/show/${queryTime?.value}`)
      //   .then(async (res) => {
      //     const { history }: { history: HistoryProps[] } = await res.json();
      //     const TRs: TRProps[] = history.map(({
      //       id,
      //       status,
      //       backupType,
      //       backupTime,
      //       indexName,
      //       backupDataSize, dataBackupCount, backupTimeSpent, checksum
      //     }) => {
      //       return createTR(id, [<Chip status={mapStatus(status)} label={mapStatusText(status)} text={mapStatusText(status)} />,
      //         backupType,
      //         backupTime,
      //         indexName,
      //         backupDataSize, dataBackupCount, backupTimeSpent, checksum], 'left', status === 'OK' ? true : false)
      //     })
      //     //setResolve(()=>TRs)
      //     return queryStatus(rollStatus, TRs);
      //     //console.log(MockChipRows)
      //   })
      //   .catch((err) => {
      //     toast.error(queryTime?.value)
      //     return resData
      //   })
    }
    return resData;

  }, []);

  return {
    WithSelectFilter,
    methods
  };
}