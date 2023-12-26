import React, { useState } from 'react';

import { CustomSelect } from './components';
import { api, useDebounce } from './hooks';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const { debouncedValue, isLoading: isDebounceLoading } = useDebounce(search, 500);

  const { data, isLoading } = api.useGetCharacters({
    params: {
      name: debouncedValue
    }
  });

  return (
    <>
      <main className='p-2'>
        <section className='flex w-[428px] justify-center pr-5'>
          <CustomSelect search={search} data={data?.results ?? []} isLoading={isLoading || isDebounceLoading} setSearch={setSearch} />
        </section>
      </main>
    </>
  );
};

export default App;
