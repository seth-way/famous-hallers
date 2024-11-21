import { useState, useEffect } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";

type GuessFormProps = {
  handleGuess: (guess: string) => void;
  isOpen: boolean;
};

export default function GuessForm({ handleGuess, isOpen }: GuessFormProps) {
  const [guess, setGuess] = useState<string>("");

  const handleChange = (value: string) => {
    setGuess(value);
  };

  const handleSubmit = (onClose: () => void) => {
    handleGuess(guess);
    onClose();
  };

  const handleClear = () => {
    setGuess("");
  };

  useEffect(() => {
    if (!isOpen) handleClear();
  }, [isOpen]);

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Guess the Player.</ModalHeader>
          <Divider />
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onClose);
              }}
              className="flex flex-col items-end gap-2 p-2"
            >
              <Input
                label="player"
                variant="faded"
                color="success"
                onValueChange={handleChange}
                isClearable
                onClear={handleClear}
                autoFocus
              />
              <Button type="submit">Submit Guess</Button>
            </form>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}
