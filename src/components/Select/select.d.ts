

export type SelectName = 'topicname'
  | 'rollStatus'
  | 'queryTime'
  | `defaultBackupTime.${string}`
  | Text
  | Chip
  | string;
