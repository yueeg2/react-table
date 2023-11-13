import { ReactElement } from 'react';

/**
 * 若 Table title 有新增需要在此新增 case 內 Table title
 * @param rows
 * @param headCellId
 * @param queryString
 * @returns
 */

export function filtering<T>(
  { rows, headCellId, queryString }: { rows: T[]; headCellId: string; queryString: string; }): T[] {
  return queryString !== ''
    ? rows.filter((row: T) => {
      const ColTitle: keyof T = headCellId as keyof T;
      const unknown: unknown = row[ColTitle];
      const LcqStr = queryString.toLowerCase();
      const result = [];
      try {
        switch (typeof unknown) {
          case 'boolean':
            break;
          case 'string':
            result.push(String(unknown)
              .toLowerCase()
              .includes(LcqStr)) && result.push(row);
            break;
          case 'object':
            if (row && typeof unknown !== 'object') {
              break;
            }
            [
              "overview", "status", "node",
              "elasticsearch",
              "logstash",
              "kibana",
              "mariadb",
              "nginx",
              "lsync",
              "metricbeat",
              "filebeat",
              "auditbeat"
            ].forEach((col) => {

              if (col !== ColTitle) return;
              const state: string = (unknown as ReactElement)?.props?.state;
              const node_type: string = (unknown as ReactElement)?.props.node_type;
              const node_ip: string = (unknown as ReactElement)?.props.node_ip;
              const last_updated: string = (unknown as ReactElement)?.props.last_updated;

              if ((state && state.toLowerCase().includes(LcqStr))
                || (node_ip && node_ip.toLowerCase().includes(LcqStr))
                || (node_type && node_type.toLowerCase().includes(LcqStr))
                || (last_updated && last_updated.toLowerCase().includes(LcqStr))) {
                result.push(row);
                return;
              }

              if ((unknown as ReactElement)?.props?.children) {
                const MNstate: string = (unknown as ReactElement)?.props?.children[1]?.props?.state;
                (MNstate && MNstate.toLowerCase().includes(LcqStr)) && result.push(row);
                return;
              }

            });
            ["cpu", "memory"].forEach((col) => {
              if (col !== ColTitle) return;
              const str: string = (unknown as ReactElement)?.props?.children[0]?.props?.children;

              if ((str && str.toLowerCase().includes(LcqStr))) {
                result.push(row);
                return;
              }
            });

            ["system_disk", "data_disk"].forEach((col) => {
              if (col !== ColTitle) return;
              const str: string = (unknown as ReactElement)?.props?.children[0]?.props?.children?.props?.children;
              if ((str && str.toLowerCase().includes(LcqStr))) {
                result.push(row);
                return;
              }
            });
            ["time", "ip", "nodetype"].forEach((col) => {
              if (col !== ColTitle) return;
              const str: string = (unknown as ReactElement)?.props?.children;
              if ((str && str.toLowerCase().includes(LcqStr))) {
                result.push(row);
                return;
              }
            });

            ["defaultValue"].forEach((col) => {
              if (col !== ColTitle) return;
              const value: string = (unknown as ReactElement)?.props?.[ColTitle].value;
              if ((value && value.toLowerCase().includes(LcqStr))) {
                result.push(row);
                return;
              }
            });
            break;
        }
      } catch (e) {
        console.error(`Sorry, some problems occur: `, e);
      }
      return result[0];

    })
    : rows;
}
