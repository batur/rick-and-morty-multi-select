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
      <main className='p-4'>
        <section className='flex w-full justify-center md:px-12 lg:max-w-[480px]'>
          <CustomSelect search={search} data={data?.results ?? []} isLoading={isLoading || isDebounceLoading} setSearch={setSearch} />
        </section>
      </main>
    </>
  );
};

export default App;
