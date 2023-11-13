
export type StatusProps = 'critical' | 'warning' | 'normal';

export type ResultProps = 'failed' | 'ongoing' | 'saving' | 'success';

export type BackupStatus = 'OK' | 'FAILED' | 'SAVING';
export type RollBackStatus = 'OK' | 'RESTORING' | 'AVAILABLE';


export type ChipStatus = StatusProps | ResultProps | BackupStatus | RollBackStatus | any;

export interface ChipProps extends SearchableProps {
  status: ChipStatus;
  iconOnly?: boolean;
  text?: string;
};

export type SearchableProps = { label: string }