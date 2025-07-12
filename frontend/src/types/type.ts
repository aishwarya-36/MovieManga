export type Movie = {
  title: string;
  year: string;
  posterUrl: string;
  imdbID: string;
  source: string;
};

export type MovieData = {
  Poster: string;
  Title: string;
  Year: string;
  imdbRating: string;
  Language: string;
  Plot: string;
  Genre: string;
  Actors: string;
  Director: string;
  Source: string;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};
