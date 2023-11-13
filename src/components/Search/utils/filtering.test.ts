import { filtering } from './filtering';


const IconElementTestCases = () => {
  return [
    "elasticsearch",
    "logstash",
    "kibana",
    "mariadb",
    "nginx",
    "lsync",
    "metricbeat",
    "filebeat",
    "auditbeat"].map((column: string) => {
      return ({
        column: column,
        queryStrings: ['ok', 'CritiCal', 'warning'],
        rows: [
          { [`${column}`]: { props: { state: 'ok', context: '' } } },
          { [`${column}`]: { props: { state: 'Critical', context: '' } } },
          { [`${column}`]: { props: { state: 'Warning', context: '' } } },
        ]
      })
    })
};
const ParamStateCases = () => {
  return ['status', 'overview'].map((column: string) => {
    return ({
      column: column,
      queryStrings: ['ok', 'CritiCal', 'warning', 'norMAl'],
      rows: [
        { [`${column}`]: { props: { state: 'ok', context: '' } } },
        { [`${column}`]: { props: { state: 'Critical', context: '' } } },
        { [`${column}`]: { props: { state: 'Warning', context: '' } } },
        { [`${column}`]: { props: { state: 'Normal', context: '' } } },
      ]
    })
  })
};
const HistoricalRecordCase = () => {
  return ["time", "ip", "nodetype"].map((column: string) => {
    return ({
      column: column,
      queryStrings: [
        '2023-06-07 19:00:05', 'lostData', '192.168.2.97',
        'master', 'extend'],
      rows: [
        // time
        { [`${column}`]: { props: { children: '2023-06-07 19:00:05' } } },

        // ip
        { [`${column}`]: { props: { children: 'lostData' } } },
        { [`${column}`]: { props: { children: '192.168.2.97' } } },

        // nodetype
        { [`${column}`]: { props: { children: 'master' } } },
        { [`${column}`]: { props: { children: 'extend' } } },
      ]
    })
  })
}
describe.each([
  ...HistoricalRecordCase(),
  ...ParamStateCases(),
  {
    column: 'node',
    queryStrings: ['134.24.33.452', 'Extend Node', '2023-04-08 04:45:05', '1.2.3.4'],
    rows: [
      { node: { props: { node_ip: '134.24.33.452', node_type: 'Master Node', last_updated: '最後更新: 2023-06-08 04:41:05', isNodesTimestampExistDifference: '', isMaster: 1 } } },
      { node: { props: { node_ip: '1.2.3.4', node_type: 'Extend Node', last_updated: '最後更新: 2023-06-04 04:45:05', isNodesTimestampExistDifference: '', isMaster: 0 } } },
      { node: { props: { node_ip: '1.2.3.4', node_type: 'Master Eligible', last_updated: '最後更新: 2023-04-08 04:45:05', isNodesTimestampExistDifference: '', isMaster: 0 } } },
    ]
  },
  {
    column: 'cpu',
    queryStrings: ['-', '34.68%'],
    rows: [
      { cpu: { props: { children: [{ props: { children: '-' } }, null] } } },
      { cpu: { props: { children: [{ props: { children: '34.68%' } }, null] } } },
    ]
  },
  {
    column: 'memory',
    queryStrings: ['-', '88.68%'],
    rows: [
      { memory: { props: { children: [{ props: { children: '-' } }, null] } } },
      { memory: { props: { children: [{ props: { children: '88.68%' } }, null] } } },
    ]
  },
  {
    column: 'system_disk',
    queryStrings: ['-', '69.08%'],
    rows: [
      { system_disk: { props: { children: [{ props: { children: { props: { children: '-' } } } }, { props: { onClick: () => { } } }] } } },
      { system_disk: { props: { children: [{ props: { children: { props: { children: '69.08%' } } } }, { props: { onClick: () => { } } }] } } },
    ]
  },
  {
    column: 'data_disk',
    queryStrings: ['-', '69.08%'],
    rows: [
      { data_disk: { props: { children: [{ props: { children: { props: { children: '-' } } } }, { props: { onClick: () => { } } }] } } },
      { data_disk: { props: { children: [{ props: { children: { props: { children: '69.08%' } } } }, { props: { onClick: () => { } } }] } } },
    ]
  },
  ...IconElementTestCases(),

])('filtering column - $column', ({ column, queryStrings, rows }) => {

  queryStrings.forEach((queryStr: string, i: number) => {
    describe(` query '${queryStr}'`, () => {
      if (queryStrings.length !== rows.length && !rows[i]) {
        it('should filter rows based on queryString in the specified column', () => {
          const result = filtering<any>({ rows, headCellId: column, queryString: queryStr });
          expect(result).toEqual([rows[1], rows[2]]);
        });
        return
      }

      it('should filter row based on queryString in the specified column', () => {
        const result = filtering<any>({ rows, headCellId: column, queryString: queryStr });

        expect(result).toEqual([rows[i]]);
      });

      it('should perform case-insensitive filtering on string values', () => {
        const result = filtering<any>({ rows, headCellId: column, queryString: queryStr });
        expect(result).toEqual([rows[i]]);
      });

      it('should return all rows when queryString is empty', () => {
        const result = filtering<any>({ rows, headCellId: column, queryString: '' });
        expect(result).toEqual(rows);
      });


    })

  })



  // Add more test cases to cover different scenarios and edge cases
});
