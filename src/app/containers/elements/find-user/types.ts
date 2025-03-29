export type FindUserProps = {
  label: string;
  onSet: (id: string) => void;
  userID?: string;
  onShowModal: (id: string) => void;
};
