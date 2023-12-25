import type { QueryOptions } from '@tanstack/react-query';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { CharacterFilter, Character, Info } from 'rickmortyapi';
import { getCharacters } from 'rickmortyapi';

type Params = Omit<CharacterFilter, 'status' | 'gender'> & {
  status?: 'Dead' | 'Alive' | 'unknown';
  gender?: 'Female' | 'Male' | 'Genderless' | 'unknown';
};

interface UseGetCharactersProps extends QueryOptions<Info<Character[]>, Error> {
  params?: Params;
}

const useGetCharacters = ({ params, ...props }: UseGetCharactersProps = {}) => {
  return useQuery({
    queryKey: ['characters', params],
    queryFn: async () => (await getCharacters(params)).data,
    placeholderData: keepPreviousData,
    ...props
  });
};

export default useGetCharacters;
