export interface UserProps {
  id?: string | null,
  institution: string,
  name_conductor: string,
  name_dog: string,
  age_dog: number,
  sex_dog: string,
}

export interface CreateParticipantDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface RadioSexProps {
  sex_dog: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}