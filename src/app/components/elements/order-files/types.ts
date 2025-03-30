export type OrderFilesProps = {
  PHOTO_ROOM: { id: number; path: string }[];
  PHOTO_REPORT: { id: number; path: string }[];
  MEASURING: { id: number; path: string }[];
  SKETCH: { id: number; path: string }[];
  isBuilder: boolean;
  isSalon: boolean;
  isAdmin: boolean;
  isTaskmaster: boolean;
  isMasurer: boolean;
  onAddFile: ({ file, type }: { file: any; type: string }) => void;
  onRemoveFile: ({ id, type }: { id: number; type: string }) => void;
};
