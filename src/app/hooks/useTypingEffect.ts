import { useEffect, useState } from 'react';

export function useTypingEffect(
  strings: string[],
  typingSpeed = 100,
  deletingSpeed = 60,
  delay = 1000,
) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentText = strings[index];

    if (!deleting && subIndex === currentText.length) {
      setTimeout(() => setDeleting(true), delay);
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % strings.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
        setText(currentText.substring(0, subIndex));
      },
      deleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, strings, typingSpeed, deletingSpeed, delay]);

  return text;
}
