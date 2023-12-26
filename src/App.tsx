import React from 'react';

import Select from 'react-select';

import { api } from './hooks';

const App: React.FC = () => {
  const [search, setSearch] = React.useState('');

  const { data } = api.useGetCharacters();

  return (
    <>
      <main className='p-4'>
        <section className='flex w-full justify-center md:px-12 lg:max-w-[480px]'>
          <Select
            className='w-full'
            options={data?.results?.map((character) => ({
              label: character.name,
              value: character.id,
              img: character.image
            }))}
            onInputChange={(value) => {
              setSearch(value);
            }}
            components={{
              Option: (option) => {
                return (
                  <div {...option} className='mb-2 w-full'>
                    <button
                      className='flex w-full flex-1 flex-row items-center text-sm text-gray-500'
                      onClick={() => {
                        option.selectOption(option.data);
                      }}>
                      <img src={option.data.img} alt={option.data.label} className='mr-2 h-8 w-8 rounded-sm' />
                      <p
                        className='capitalize'
                        dangerouslySetInnerHTML={{
                          __html: option.data.label.toLocaleLowerCase().replace(search.toLocaleLowerCase(), `<strong>${search}</strong>`)
                        }}
                      />
                    </button>
                  </div>
                );
              }
            }}
            isMulti
            isSearchable
          />
        </section>
      </main>
    </>
  );
};

export default App;
