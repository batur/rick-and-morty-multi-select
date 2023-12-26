import React, { useCallback, useState } from 'react';

import Select from 'react-select';
import { type Character } from 'rickmortyapi';

import { api, useDebounce } from './hooks';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const { debouncedValue, isLoading: isDebounceLoading } = useDebounce(search, 500);
  const { data, isLoading } = api.useGetCharacters({
    params: {
      name: debouncedValue
    }
  });

  const resetSearchValue = React.useCallback(() => {
    setTimeout(() => {
      setSearch('');
    }, 500);
  }, []);

  const handleLabelWithSearchValue = useCallback(
    (label: string) => {
      return label.toLocaleLowerCase().replace(search.toLocaleLowerCase(), `<strong>${search}</strong>`);
    },
    [search]
  );

  return (
    <>
      <main className='p-4'>
        <section className='flex w-full justify-center md:px-12 lg:max-w-[480px]'>
          <Select
            className='w-full'
            options={data?.results?.map((character: Character) => ({
              value: character.id,
              label: character.name,
              img: character.image
            }))}
            onInputChange={(value) => {
              setSearch(value);
            }}
            components={{
              Option: (option) => {
                return (
                  <div key={option.data.value} className={`mb-2 w-full ${option.isFocused && 'bg-slate-100'}`}>
                    <button
                      className='flex w-full flex-1 flex-row items-center text-sm text-gray-500'
                      onClick={() => {
                        option.selectOption(option.data);
                        resetSearchValue();
                      }}>
                      <img src={option.data.img} alt={option.data.label} className='mr-2 h-8 w-8 rounded-sm' />
                      <p
                        className='capitalize'
                        dangerouslySetInnerHTML={{
                          __html: handleLabelWithSearchValue(option.data.label)
                        }}
                      />
                    </button>
                  </div>
                );
              }
            }}
            isLoading={isLoading || isDebounceLoading}
            isClearable
            isMulti
            isSearchable
          />
        </section>
      </main>
    </>
  );
};

export default App;
