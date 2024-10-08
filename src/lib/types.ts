import { User } from "@prisma/client";

export interface UserProps {
  id?: string | null;
  institution: string;
  name_conductor: string;
  name_dog: string;
  age_dog: number;
  sex_dog: string;
  test_time: string;
  pontuation: number;
  fileURL: string;
}

export interface CreateParticipantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onMutate: () => void;
}
export interface UpdateParticipantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: User;
  onMutate: () => void;
}

export interface RadioSexProps {
  sex_dog: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}
