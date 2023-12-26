import React from 'react';

import Select from 'react-select';

import { api } from './hooks';

const App: React.FC = () => {
  const { data } = api.useGetCharacters();

  return (
    <>
      <div>
        <Select
          options={data?.results?.map((character) => ({
            label: character.name,
            value: character.id
          }))}
          isMulti
          isSearchable
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
    </>
  );
};

export default App;
