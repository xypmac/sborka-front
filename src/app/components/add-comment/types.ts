export type AddCommentProps = {
  onAddComment: ({ ID, comment }: { ID: number; comment: string }) => void;
  ID: number;
};
