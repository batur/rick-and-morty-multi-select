import type { QueryOptions } from '@tanstack/react-query';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { CharacterFilter, Character, Info } from 'rickmortyapi';
import { getCharacters } from 'rickmortyapi';

type Modify<T, R> = Omit<T, keyof R> & R;
interface Param
  extends Modify<
    CharacterFilter,
    {
      status: 'Dead' | 'Alive' | 'unknown';
      gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
    }
  > {}
interface UseGetCharactersProps extends QueryOptions<Info<Character[]>, Error> {
  params?: Partial<Param>;
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
